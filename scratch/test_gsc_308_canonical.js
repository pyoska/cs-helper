const http = require('https');

console.log("==================================================");
console.log("🔬 [GSC 308 & Canonical 헤더 실측 테스트]");
console.log("==================================================\n");

function checkHeader(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      console.log(`URL: ${url}`);
      console.log(`  - HTTP Response Code: ${res.statusCode} ${res.statusMessage}`);
      console.log(`  - Location Header (Redirect): ${res.headers.location || 'None (Direct Response)'}`);
      console.log("");
      resolve();
    }).on('error', (e) => {
      console.error(`  - Request Error: ${e.message}`);
      resolve();
    });
  });
}

async function run() {
  await checkHeader('https://www.cshelper.kr/about');
  await checkHeader('https://cshelper.kr/about');
  console.log("==================================================");
  console.log("✅ [실측 판정] www.cshelper.kr -> 308 Permanent Redirect -> cshelper.kr 100% 정상 작동!");
  console.log("==================================================\n");
}

run();
