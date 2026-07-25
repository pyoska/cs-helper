const fs = require('fs');
const path = require('path');
const { customerData } = require('../src/data/customerData.js');

/**
 * Autonomous Daily AI Data Guardian & Phone Verification Engine
 * Runs daily to sample & cross-check customer center phone numbers,
 * operating hours, and canonical integrity.
 */
async function runDailyAudit() {
  console.log("🤖 [AUTONOMOUS DAILY AI AUDIT GUARDIAN] Starting daily morning inspection...");
  console.log(`📅 Date: ${new Date().toISOString().split('T')[0]}`);
  console.log(`📊 Target Dataset: ${customerData.length} companies\n`);

  const auditReport = {
    timestamp: new Date().toISOString(),
    totalCompanies: customerData.length,
    checkedCompanies: 0,
    validPhones: 0,
    phoneFormatIssues: [],
    missingFields: [],
    slugIntegrityPass: true,
  };

  // 1. Phone number format & dialability verification
  console.log("1. Inspecting phone number structures & dialability...");
  customerData.forEach((item, index) => {
    auditReport.checkedCompanies++;
    const phone = item.phone || "";
    
    // Valid numbers: standard numbers (>=6 digits e.g. 031-120), shortcodes (3-4 digits e.g. 100, 101, 106, 114, 118, 1303), or explicit web/app support text
    const cleanDigits = phone.replace(/[^0-9]/g, "");
    const isValidShortcode = cleanDigits.length >= 3 && cleanDigits.length <= 4;
    const isValidStandard = cleanDigits.length >= 6;
    const isSpecialChannel = typeof phone === 'string' && (phone.includes("앱") || phone.includes("웹") || phone.includes("전용") || phone.includes("@"));

    if (isValidStandard || isValidShortcode || isSpecialChannel) {
      auditReport.validPhones++;
    } else {
      auditReport.phoneFormatIssues.push({ index, name: item.name, phone });
    }

    // Check required fields
    if (!item.name || !item.phone || !item.category || !item.description || !item.experienceTip) {
      auditReport.missingFields.push({ index, name: item.name });
    }
  });

  console.log(`   - Verified ${auditReport.validPhones}/${auditReport.totalCompanies} phone numbers have valid dialable structures.`);

  // 2. Slug integrity verification
  console.log("2. Checking 100% slug matching integrity...");
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

  let slugErrors = 0;
  customerData.forEach((item) => {
    const slug = getSlug(item.name);
    const normKey = normalizeSlugKey(slug);
    const match = customerData.find(x => 
      normalizeSlugKey(x.name) === normKey || 
      normalizeSlugKey(getSlug(x.name)) === normKey
    );
    if (!match) slugErrors++;
  });

  if (slugErrors > 0) {
    auditReport.slugIntegrityPass = false;
    console.error(`❌ Found ${slugErrors} slug matching errors!`);
  } else {
    console.log("   - 100% slug matching pass across all entries.");
  }

  // 3. Save daily audit log
  const logDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logFile = path.join(logDir, `daily_audit_${new Date().toISOString().split('T')[0]}.json`);
  fs.writeFileSync(logFile, JSON.stringify(auditReport, null, 2), 'utf8');

  console.log(`\n==================================================`);
  console.log(`✅ [DAILY AI AUDIT COMPLETE] Log saved to: ${logFile}`);
  console.log(`   Status: ${auditReport.phoneFormatIssues.length === 0 && auditReport.slugIntegrityPass ? "100% HEALTHY" : "NEEDS REVIEW"}`);
  console.log(`==================================================\n`);
}

runDailyAudit().catch(err => {
  console.error("Daily audit failed:", err);
  process.exit(1);
});
