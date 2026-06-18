import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TurboFactory } from '@ardrive/turbo-sdk';
import { assertDeployWalletAllowed } from './wallet-safety.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const walletPath = process.env.ARWEAVE_WALLET || process.env.WALLET_PATH;

if (!walletPath) {
  console.error('Set ARWEAVE_WALLET=/path/to/wallet.json before deploying.');
  process.exit(1);
}

const wallet = JSON.parse(await readFile(walletPath, 'utf8'));
assertDeployWalletAllowed(walletPath, wallet);
const turbo = TurboFactory.authenticated({ privateKey: wallet });

const result = await turbo.uploadFolder({
  folderPath: distDir,
  dataItemOpts: {
    tags: [
      { name: 'App-Name', value: 'HyperBEAM-Device-Docs' },
      { name: 'Router-Mode', value: 'hash' }
    ]
  },
  manifestOptions: {
    indexFile: 'index.html',
    fallbackFile: 'index.html'
  },
  maxConcurrentUploads: Number(process.env.TURBO_UPLOAD_CONCURRENCY || 4)
});

console.log(JSON.stringify(result, null, 2));
const manifestId = result.manifestResponse?.id;
if (manifestId) {
  console.log(`Gateway URL: https://arweave.net/${manifestId}/#/`);
  console.log(`SHIP_URL=https://arweave.net/${manifestId}/#/`);
}
