const fs = require('fs');
const path = require('path');

console.log("==================================================");
console.log("🔬 [H1 태그 전수 검사 스크립트]");
console.log("==================================================\n");

const appDir = path.join(__dirname, '../src/app');
let violations = 0;

function checkH1(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      checkH1(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(/<h1/gi) || [];
      if (matches.length > 1) {
        console.error(`🔴 Multiple H1 tags found in: ${fullPath} (${matches.length} H1s)`);
        violations++;
      }
    }
  });
}

checkH1(appDir);

if (violations === 0) {
  console.log("✅ [H1 전수 검사 통과] 모든 페이지 100% 단 1개의 H1 태그만 존재함!");
} else {
  console.log(`🔴 [위반 감지] ${violations}개 파일에서 중복 H1 감지됨`);
}
console.log("==================================================\n");
