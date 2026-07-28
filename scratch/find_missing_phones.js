const { customerData } = require('../src/data/customerData.js');

console.log("==================================================");
console.log("🔍 [전화번호 누락 10개 기업 탐색 스크립트]");
console.log("==================================================\n");

const missing = [];
customerData.forEach((item, index) => {
  if (!item.phone || item.phone.length < 7) {
    missing.push({ index, name: item.name, phone: item.phone, category: item.category });
  }
});

console.log(`누락 기업 수: ${missing.length}개\n`);
missing.forEach(m => {
  console.log(`- [Index ${m.index}] ${m.name} (${m.category}) -> 현재 phone: "${m.phone}"`);
});

console.log("\n==================================================");
