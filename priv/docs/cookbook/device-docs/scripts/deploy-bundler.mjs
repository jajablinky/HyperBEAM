#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { assertDeployWalletAllowed } from './wallet-safety.mjs';

const require = createRequire(import.meta.url);
const { ArweaveSigner, createData, DataItem } = require('@dha-team/arbundles');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));

const bundlerUrl = normalizeBaseUrl(process.env.BUNDLER_URL || 'https://bundler.mystical.computer');
const gatewayUrl = normalizeBaseUrl(process.env.ARWEAVE_GATEWAY || 'https://arweave.net');
const uploadPath = process.env.BUNDLER_UPLOAD_PATH || '/~bundler@1.0/item?codec-device=ans104@1.0';
const walletPath = process.env.ARWEAVE_WALLET || process.env.WALLET_PATH || process.env.ARWEAVE_JWK;
const concurrency = positiveInt(process.env.BUNDLER_UPLOAD_CONCURRENCY || '4', 'BUNDLER_UPLOAD_CONCURRENCY');
const timeoutMs = positiveInt(process.env.BUNDLER_UPLOAD_TIMEOUT_MS || '120000', 'BUNDLER_UPLOAD_TIMEOUT_MS');
const pollMs = positiveInt(process.env.BUNDLER_POLL_MS || '2000', 'BUNDLER_POLL_MS');
const verifyTimeoutMs = positiveInt(process.env.BUNDLER_VERIFY_TIMEOUT_MS || '90000', 'BUNDLER_VERIFY_TIMEOUT_MS');

if (!walletPath) {
  console.error('Set ARWEAVE_WALLET=/path/to/wallet.json before deploying.');
  process.exit(1);
}

function positiveInt(raw, name) {
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }
  return value;
}

function normalizeBaseUrl(raw) {
  return String(raw).replace(/\/+$/g, '');
}

function endpoint(base, suffix) {
  const cleanSuffix = suffix.startsWith('/') ? suffix : `/${suffix}`;
  return `${normalizeBaseUrl(base)}${cleanSuffix}`;
}

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/g, '');
}

function base64urlDecode(input) {
  const padded = input + '='.repeat((4 - (input.length % 4)) % 4);
  return Buffer.from(padded.replaceAll('-', '+').replaceAll('_', '/'), 'base64');
}

function walletAddress(jwk) {
  if (!jwk?.n) return '(unknown)';
  return base64url(createHash('sha256').update(base64urlDecode(jwk.n)).digest());
}

function contentTypeFor(relativePath) {
  const ext = path.extname(relativePath).toLowerCase();
  const types = {
    '.css': 'text/css; charset=utf-8',
    '.gif': 'image/gif',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
  };
  return types[ext] || 'application/octet-stream';
}

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(absolutePath));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }
  return files.sort((a, b) => a.localeCompare(b));
}

async function normalizedItemId(value) {
  const resolved = value && typeof value.then === 'function' ? await value : value;
  if (typeof resolved === 'string') return resolved;
  if (resolved instanceof Uint8Array) return base64url(resolved);
  return String(resolved);
}

async function itemIdFromRaw(raw) {
  const parsed = new DataItem(raw);
  return normalizedItemId(parsed.id);
}

async function makeDataItem(signer, data, tags) {
  const item = createData(data, signer, { tags });
  await item.sign(signer);
  const raw = Buffer.from(item.getRaw());
  const parsed = new DataItem(raw);
  const valid = await parsed.isValid();
  if (!valid) throw new Error('Signed ANS-104 item failed local signature verification');
  return {
    id: await normalizedItemId(item.id || itemIdFromRaw(raw)),
    raw
  };
}

async function fetchText(url, options = {}, requestTimeoutMs = timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), requestTimeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    const text = Buffer.from(await res.arrayBuffer()).toString('utf8');
    return { res, text };
  } finally {
    clearTimeout(timer);
  }
}

async function postItem(raw, label) {
  const url = endpoint(bundlerUrl, uploadPath);
  const { res, text } = await fetchText(url, {
    method: 'POST',
    headers: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/octet-stream'
    },
    body: raw
  });

  if (!res.ok) {
    throw new Error(`Upload failed for ${label} (${res.status} ${res.statusText}): ${text.slice(0, 500)}`);
  }

  return {
    status: res.status,
    body: text.slice(0, 500),
    idHeader: res.headers.get('id') || ''
  };
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

function commonTags(extra = []) {
  return [
    { name: 'App-Name', value: 'HyperBEAM-Device-Docs' },
    { name: 'App-Version', value: packageJson.version },
    { name: 'Router-Mode', value: 'hash' },
    { name: 'Unix-Time', value: String(Math.floor(Date.now() / 1000)) },
    ...extra
  ];
}

function manifestFor(pathMap) {
  return {
    manifest: 'arweave/paths',
    version: '0.2.0',
    index: { path: 'index.html' },
    paths: pathMap
  };
}

async function waitForUrl(url, matcher, label) {
  const deadline = Date.now() + verifyTimeoutMs;
  let last = '';
  while (Date.now() < deadline) {
    const { res, text } = await fetchText(url, {
      headers: {
        accept: 'text/html, text/markdown, application/json, */*',
        'cache-control': 'no-cache'
      }
    }, 30000).catch((err) => ({
      res: { ok: false, status: 'fetch-error', statusText: err.message },
      text: err.message
    }));
    last = `${res.status} ${res.statusText || ''} ${String(text).slice(0, 160)}`.trim();
    if (res.ok && matcher(text, res)) return { ok: true, status: res.status };
    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }
  return { ok: false, last, label, url };
}

async function main() {
  const distExists = await stat(distDir).then((s) => s.isDirectory()).catch(() => false);
  if (!distExists) {
    throw new Error('dist/ does not exist. Run npm run docs:build first.');
  }

  const wallet = JSON.parse(await readFile(walletPath, 'utf8'));
  assertDeployWalletAllowed(walletPath, wallet);
  const signer = new ArweaveSigner(wallet);
  const files = await collectFiles(distDir);
  const pathMap = {};

  console.log(`Bundler: ${bundlerUrl}`);
  console.log(`Upload route: ${uploadPath}`);
  console.log(`Gateway: ${gatewayUrl}`);
  console.log(`Wallet address: ${walletAddress(wallet)}`);
  console.log(`Files: ${files.length}`);
  console.log(`Concurrency: ${concurrency}`);

  let uploaded = 0;
  await mapLimit(files, concurrency, async (absolutePath) => {
    const relativePath = path.relative(distDir, absolutePath).replace(/\\/g, '/');
    const data = await readFile(absolutePath);
    const item = await makeDataItem(signer, data, commonTags([
      { name: 'Content-Type', value: contentTypeFor(relativePath) },
      { name: 'Type', value: 'docs-site-asset' },
      { name: 'File-Path', value: relativePath }
    ]));
    await postItem(item.raw, relativePath);
    uploaded += 1;
    pathMap[relativePath] = { id: item.id };
    console.log(`[${String(uploaded).padStart(String(files.length).length, ' ')}/${files.length}] ${relativePath} -> ${item.id}`);
    return item;
  });

  const manifest = manifestFor(Object.fromEntries(Object.entries(pathMap).sort(([a], [b]) => a.localeCompare(b))));
  const manifestBytes = Buffer.from(JSON.stringify(manifest, null, 2), 'utf8');
  const manifestItem = await makeDataItem(signer, manifestBytes, commonTags([
    { name: 'Content-Type', value: 'application/x.arweave-manifest+json' },
    { name: 'Type', value: 'docs-site-manifest' }
  ]));
  await postItem(manifestItem.raw, 'manifest');

  const indexId = manifest.paths['index.html']?.id;
  const bundlerManifestUrl = `${bundlerUrl}/${manifestItem.id}`;
  const bundlerIndexItemUrl = indexId ? `${bundlerUrl}/${indexId}` : '';
  const bundlerIndexPathUrl = `${bundlerUrl}/${manifestItem.id}/index.html#/`;
  const gatewayAppUrl = `${gatewayUrl}/${manifestItem.id}/#/`;
  const gatewayIndexUrl = `${gatewayUrl}/${manifestItem.id}/index.html#/`;

  console.log('');
  console.log(`Manifest ID: ${manifestItem.id}`);
  console.log(`Index ID: ${indexId}`);
  console.log(`Bundler manifest item URL: ${bundlerManifestUrl}`);
  if (bundlerIndexItemUrl) console.log(`Bundler direct index item URL: ${bundlerIndexItemUrl}`);
  console.log(`Gateway URL: ${gatewayAppUrl}`);
  console.log(`Gateway index URL: ${gatewayIndexUrl}`);

  if (indexId) {
    const indexCheck = await waitForUrl(
      `${bundlerUrl}/${indexId}`,
      (text) => text.includes('HyperBEAM Device Docs'),
      'uploaded index item'
    );
    console.log(`Verified direct index item on bundler: ${indexCheck.ok ? 'yes' : `no (${indexCheck.last})`}`);
  }

  const appCheck = await waitForUrl(
    `${bundlerUrl}/${manifestItem.id}/index.html`,
    (text) => text.includes('HyperBEAM Device Docs'),
    'manifest index path'
  );
  console.log(`Verified manifest path on bundler: ${appCheck.ok ? 'yes' : `no (${appCheck.last})`}`);
  if (appCheck.ok) {
    console.log(`Bundler app URL: ${bundlerIndexPathUrl}`);
  } else {
    console.log('Use the gateway URL for browsing; this bundler serves raw accepted items but may not route manifest subpaths immediately.');
  }

  console.log(`SHIP_URL=${gatewayAppUrl}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
