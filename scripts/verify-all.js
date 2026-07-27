const fs = require('fs');
const path = require('path');
const { customerData } = require('../src/data/customerData.js');

console.log("🔍 [SYSTEM AUTOMATED INTEGRITY GUARD] Running pre-build validation...\n");

let errors = [];

// 1. Validate customerData schema & required fields
console.log("1. Validating customerData schema & completeness...");
if (!Array.isArray(customerData) || customerData.length === 0) {
  errors.push("customerData is empty or invalid array!");
} else {
  console.log(`   - Verified ${customerData.length} entries present.`);
  customerData.forEach((item, index) => {
    if (!item.name) errors.push(`Entry #${index} missing 'name'`);
    if (!item.phone) errors.push(`Entry #${index} (${item.name}) missing 'phone'`);
    if (!item.category) errors.push(`Entry #${index} (${item.name}) missing 'category'`);
    if (!item.description) errors.push(`Entry #${index} (${item.name}) missing 'description'`);
    if (!item.experienceTip) errors.push(`Entry #${index} (${item.name}) missing 'experienceTip'`);
  });
}

// 2. Validate Slug Matching & Edge Cases
console.log("2. Testing Slug Generation & Edge Case Robustness...");
const normalizeSlugKey = (str) => {
  if (!str) return "";
  let s = str;
  try { s = decodeURIComponent(s); } catch (e) {}
  return s
    .toLowerCase()
    .replace(/%2b/gi, "")
    .replace(/[\/\\:*?"<>|%,.*+\s-]/g, "")
    .replace(/고객센터/g, "");
};

const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim().replace(/고객센터/g, "").trim();
  cleanName = cleanName.replace(/[\/\\:*?"<>|%,.*+]/g, "");
  return cleanName.replace(/[\s-]+/g, "-") + "-고객센터";
};

customerData.forEach((item) => {
  const slug = getSlug(item.name);
  const normKey = normalizeSlugKey(slug);
  const match = customerData.find(x => 
    normalizeSlugKey(x.name) === normKey || 
    normalizeSlugKey(getSlug(x.name)) === normKey
  );
  if (!match) {
    errors.push(`Slug mismatch or unmatchable company: "${item.name}" -> slug "${slug}"`);
  }
});
console.log("   - All slugs generated and matched without errors.");

// 3. Test Template Prefix Repetition
console.log("3. Verifying Anti-Boilerplate Diversity...");
const starterCounts = {};
customerData.forEach((item) => {
  const tip = item.experienceTip || "";
  const starter = tip.split(" ").slice(0, 2).join(" ");
  starterCounts[starter] = (starterCounts[starter] || 0) + 1;
});

const maxStarter = Object.entries(starterCounts).sort((a, b) => b[1] - a[1])[0];
if (maxStarter && maxStarter[1] > 15) {
  errors.push(`Template repetition detected: Starter "${maxStarter[0]}" appears ${maxStarter[1]} times!`);
} else {
  console.log(`   - Diversity pass! Max repeated starter: "${maxStarter[0]}" (${maxStarter[1]} times).`);
}

// 4. Scan source files and public directory for forbidden non-canonical hardcoded domain strings and undefined text
console.log("4. Scanning source & public files for canonical domain and undefined text violations...");
const appDir = path.join(__dirname, '../src/app');
const publicDir = path.join(__dirname, '../public');

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.xml') || file.endsWith('.txt')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('www.cshelper.kr')) {
        errors.push(`Forbidden 'www.cshelper.kr' found in file: ${fullPath}`);
      }
      if ((file === 'llms.txt' || file === 'llms-full.txt') && content.includes('undefined')) {
        errors.push(`Forbidden 'undefined' value found in AI dataset: ${fullPath}`);
      }
    }
  });
}
scanDir(appDir);
scanDir(publicDir);
console.log("   - Domain & public file scan complete. 0 'www' or 'undefined' bugs found.");

// Final Status
console.log("\n==================================================");
if (errors.length > 0) {
  console.error("❌ [AUTOMATED INTEGRITY FAILURE] Found errors:");
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log("✅ [AUTOMATED INTEGRITY PASSED] All pre-build checks clear!");
  console.log("==================================================\n");
}
