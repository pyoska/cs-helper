const fs = require('fs');
const path = require('path');

const originalPath = path.join(__dirname, '../public/cshelper-customer-center-helper-logo-original.png');
const scratchBackup = path.join(__dirname, '../scratch/cshelper-customer-center-helper-logo-original.png');

if (fs.existsSync(originalPath)) {
  fs.renameSync(originalPath, scratchBackup);
  console.log("Moved 4.5MB original logo out of public/ to scratch/");
} else {
  console.log("File not found or already moved.");
}
