const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log("==================================================");
console.log("🚀 [NAVER SEARCH ADVISOR & INDEXNOW KEY GENERATOR]");
console.log("==================================================\n");

// 1. Generate 32-character hex key conforming to Naver rules (0-9, a-f, min 8 max 128 chars)
const keyPath = path.join(__dirname, '../public/indexnow-key.json');
let indexNowKey = '';

if (fs.existsSync(keyPath)) {
  const existing = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  indexNowKey = existing.key;
  console.log(`📌 기존 IndexNow Key 사용: ${indexNowKey}`);
} else {
  indexNowKey = crypto.randomBytes(16).toString('hex'); // 32 chars 16-hex
  fs.writeFileSync(keyPath, JSON.stringify({ key: indexNowKey, createdAt: new Date().toISOString() }, null, 2), 'utf8');
  console.log(`📌 신규 IndexNow Key 생성: ${indexNowKey}`);
}

// 2. Write key file to public/[key].txt
const publicTxtPath = path.join(__dirname, `../public/${indexNowKey}.txt`);
fs.writeFileSync(publicTxtPath, indexNowKey, 'utf8');

console.log(`✅ 루트 키 파일 생성 완수: public/${indexNowKey}.txt`);
console.log(`🌐 접속 확인 URL: https://cshelper.kr/${indexNowKey}.txt`);
console.log("==================================================");
