const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/customerData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace typos
content = content.replace(/デスク/g, "데스크")
                 .replace(/단장기/g, "단기·장기");

fs.writeFileSync(filePath, content, 'utf8');
console.log('customerData.js typos cleaned successfully!');
