const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizeLogo() {
  const inputPath = path.join(__dirname, '../public/cshelper-customer-center-helper-logo.png');
  const backupPath = path.join(__dirname, '../public/cshelper-customer-center-helper-logo-original.png');
  
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
    console.log("Original logo backed up to cshelper-customer-center-helper-logo-original.png");
  }

  // Get metadata
  const meta = await sharp(inputPath).metadata();
  console.log(`Original dimensions: ${meta.width}x${meta.height}, format: ${meta.format}`);

  // Resize to max 600px width (since logo is displayed as small icon/header)
  const buffer = await sharp(inputPath)
    .resize({ width: 600, withoutEnlargement: true })
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer();

  fs.writeFileSync(inputPath, buffer);
  console.log(`New optimized PNG logo size: ${(buffer.length / 1024).toFixed(2)} KB (${buffer.length} bytes)`);

  // Also create WebP version for maximum speed
  const webpBuffer = await sharp(inputPath)
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();

  const webpPath = path.join(__dirname, '../public/cshelper-customer-center-helper-logo.webp');
  fs.writeFileSync(webpPath, webpBuffer);
  console.log(`WebP logo size: ${(webpBuffer.length / 1024).toFixed(2)} KB (${webpBuffer.length} bytes)`);
}

optimizeLogo().catch(err => console.error(err));
