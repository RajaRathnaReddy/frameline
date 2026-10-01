const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'src', 'lib', 'data', 'categories');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Target categories directory:', targetDir);
