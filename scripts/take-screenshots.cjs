const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(__dirname, '..', 'dist');
const brainDir = 'C:/Users/DELLL/.gemini/antigravity/brain/afd308a0-0a77-427e-b357-0e082aa83bf6';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8089, () => {
  console.log('Static server listening on http://localhost:8089');

  try {
    const desktopPng = path.join(brainDir, 'screenshot-desktop.png');
    const mobilePng = path.join(brainDir, 'screenshot-mobile.png');

    console.log('Capturing desktop screenshot (1280x900)...');
    execSync(`"${edgePath}" --headless=new --disable-gpu --no-sandbox --hide-scrollbars --window-size=1280,900 --screenshot="${desktopPng}" http://localhost:8089/`, { timeout: 20000 });
    console.log('✓ Desktop screenshot captured:', desktopPng);

    console.log('Capturing mobile screenshot (390x844)...');
    execSync(`"${edgePath}" --headless=new --disable-gpu --no-sandbox --hide-scrollbars --window-size=390,844 --screenshot="${mobilePng}" http://localhost:8089/`, { timeout: 20000 });
    console.log('✓ Mobile screenshot captured:', mobilePng);

  } catch (err) {
    console.error('Screenshot error:', err.message);
  } finally {
    server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
    });
  }
});
