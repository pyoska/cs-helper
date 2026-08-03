const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../public/cshelper-customer-center-helper-logo.png');
if (fs.existsSync(logoPath)) {
  const stat = fs.statSync(logoPath);
  console.log("Logo file size:", (stat.size / (1024 * 1024)).toFixed(2), "MB (" + stat.size + " bytes)");
} else {
  console.log("Logo file not found");
}
