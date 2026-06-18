import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const preferredPort = Number(process.env.PORT || 4173);

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const rel = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
  const abs = path.resolve(distDir, rel);
  if (!abs.startsWith(distDir)) return path.join(distDir, 'index.html');
  return abs;
}

function listen(port) {
  const server = http.createServer(async (req, res) => {
    let file = safePath(req.url || '/');
    const info = await stat(file).catch(() => null);
    if (!info || info.isDirectory()) {
      if (path.extname(file)) {
        res.statusCode = 404;
        res.setHeader('content-type', 'text/plain; charset=utf-8');
        res.end('Not found');
        return;
      }
      file = path.join(distDir, 'index.html');
    }
    const ext = path.extname(file);
    res.setHeader('content-type', types[ext] || 'application/octet-stream');
    createReadStream(file).pipe(res);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') listen(port + 1);
    else throw err;
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(`Serving docs at http://127.0.0.1:${port}/`);
  });
}

listen(preferredPort);
