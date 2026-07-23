const fs = require('fs');
const path = require('path');
const { customerData } = require('../src/data/customerData.js');

console.log('Auditing database phone number formatting...');

const formatErrors = [];

customerData.forEach(item => {
  const phone = item.phone || '';
  const mainPhone = item.main_phone || '';
  
  // 1. Check for empty or invalid placeholder characters
  if (!phone || phone.includes('정보 없음') || phone.trim() === '') {
    formatErrors.push({ name: item.name, issue: 'Empty or blank phone number' });
  }
  
  // 2. Check for invalid characters (should only be numbers, hyphens, or parentheses/special flags)
  const cleanPhone = phone.replace(/\([^)]*\)/g, '').trim();
  if (/[^0-9-]/g.test(cleanPhone)) {
    formatErrors.push({ name: item.name, issue: `Contains invalid characters: "${phone}"` });
  }
  
  // 3. Check length (must be at least 8 digits for local numbers like 1588-xxxx, or up to 13 digits for 02-xxxx-xxxx)
  const digitsOnly = cleanPhone.replace(/[^0-9]/g, '');
  if (digitsOnly.length < 8 && digitsOnly.length > 0) {
    formatErrors.push({ name: item.name, issue: `Suspiciously short phone number: "${phone}" (${digitsOnly.length} digits)` });
  }
  if (digitsOnly.length > 12) {
    formatErrors.push({ name: item.name, issue: `Suspiciously long phone number: "${phone}" (${digitsOnly.length} digits)` });
  }
});

console.log(`\nAudit finished! Found ${formatErrors.length} potential formatting issues.`);
formatErrors.forEach((err, idx) => {
  console.log(`[${idx + 1}] ${err.name} -> ${err.issue}`);
});
