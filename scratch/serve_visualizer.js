const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const VISUALIZER_DIR = path.resolve(__dirname, '../visualizer');
const ROOT_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // First check visualizer directory
  let filePath = path.join(VISUALIZER_DIR, reqPath);
  
  if (!fs.existsSync(filePath)) {
    // Check root directory fallback (for ../ links or root paths)
    filePath = path.join(ROOT_DIR, reqPath);
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found: ' + reqPath);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`==================================================`);
  console.log(`🚀 SQL Mastery Visualizer is LIVE on localhost!`);
  console.log(`👉 Access URL: http://localhost:${PORT}`);
  console.log(`==================================================`);
});
