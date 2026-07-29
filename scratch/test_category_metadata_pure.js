const categories = ["카드", "은행", "통신", "가전", "보험", "배달·쇼핑", "항공·여행", "IT·플랫폼", "자동차", "증권", "기타"];

console.log("==================================================");
console.log("🔬 [Category Page Dynamic Metadata Pure Test]");
console.log("==================================================\n");

const titles = new Set();
const descs = new Set();

categories.forEach(cat => {
  const title = `${cat} 고객센터 대표전화 모음 및 ARS 단축키 - CS 고객센터 도우미`;
  const description = `대한민국 주요 ${cat} 관련 기업 고객센터 대표 전화번호, ARS 0번 직통 연결 단축키, 상담 운영시간, 피크시간 회피 노하우를 한눈에 확인하세요.`;
  titles.add(title);
  descs.add(description);
  console.log(`- Category: [${cat}] -> Title: "${title}"`);
});

console.log(`\nUnique Titles Count: ${titles.size} / 11`);
console.log(`Unique Descriptions Count: ${descs.size} / 11`);
console.log("==================================================");
