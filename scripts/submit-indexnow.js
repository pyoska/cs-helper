const fs = require('fs');
const path = require('path');
const { customerData } = require('../src/data/customerData.js');

console.log("==================================================");
console.log("🚀 [NAVER SEARCH ADVISOR & GLOBAL INDEXNOW SUBMITTER]");
console.log("==================================================\n");

// 1. Get Key
const keyConfigPath = path.join(__dirname, '../public/indexnow-key.json');
if (!fs.existsSync(keyConfigPath)) {
  console.error("🔴 IndexNow Key가 존재하지 않습니다. node scripts/setup-indexnow.js 를 먼저 실행하세요.");
  process.exit(1);
}

const { key } = JSON.parse(fs.readFileSync(keyConfigPath, 'utf8'));
const host = "cshelper.kr";
const siteUrl = "https://cshelper.kr";
const keyLocation = `${siteUrl}/${key}.txt`;

// Helper: Slug encoder matching site standard
function getSlug(name) {
  if (!name) return "";
  return name.trim().replace(/\s+/g, "-");
}

// 2. Build complete list of canonical URLs
const urlList = [];

// Homepage
urlList.push(`${siteUrl}/`);

// Static Info Pages
urlList.push(`${siteUrl}/about`);
urlList.push(`${siteUrl}/contact`);
urlList.push(`${siteUrl}/privacy`);
urlList.push(`${siteUrl}/terms`);

// Categories (11)
const categories = ["카드", "은행", "통신", "가전", "배달·쇼핑", "보험", "항공·여행", "IT·플랫폼", "자동차", "증권", "기타"];
categories.forEach(cat => {
  urlList.push(`${siteUrl}/category/${encodeURIComponent(cat)}`);
});

// Customer Pages (1,049)
customerData.forEach(item => {
  if (item?.name) {
    const slug = getSlug(item.name);
    urlList.push(`${siteUrl}/${encodeURIComponent(slug)}`);
  }
});

console.log(`📌 수집된 전 전체 Canonical URL 총 수: ${urlList.length}개`);
console.log(`📌 Key: ${key}`);
console.log(`📌 Key Location: ${keyLocation}\n`);

// 3. Helper to post IndexNow batch
async function sendIndexNow(endpointName, targetUrl) {
  console.log(`📤 [${endpointName}] 네이버/IndexNow 갱신 요청 전송 중... (${targetUrl})`);
  
  // Batch into chunks of 500 URLs (Max 10,000 allowed per request)
  const chunkSize = 500;
  for (let i = 0; i < urlList.length; i += chunkSize) {
    const chunk = urlList.slice(i, i + chunkSize);
    const payload = {
      host: host,
      key: key,
      keyLocation: keyLocation,
      urlList: chunk
    };

    try {
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      const status = response.status;
      const text = await response.text();
      console.log(`   - 배치 ${Math.floor(i / chunkSize) + 1} (${chunk.length}개 URL): HTTP ${status} (${status === 200 ? '🟢 Success' : status === 202 ? '🔵 Accepted (Key Pending)' : '🟡 Code ' + status})`);
      if (text) {
        console.log(`     응답 메시지: ${text.slice(0, 100)}`);
      }
    } catch (err) {
      console.error(`   - 🔴 [${endpointName}] 전송 실패: ${err.message}`);
    }
  }
}

async function main() {
  // 1. Naver Search Advisor IndexNow Endpoint
  await sendIndexNow("네이버 서치어드바이저", "https://searchadvisor.naver.com/indexnow");
  
  // 2. Global IndexNow API (Bing, Yandex, etc.)
  await sendIndexNow("글로벌 IndexNow (Bing/Yandex)", "https://api.indexnow.org/indexnow");

  console.log("\n==================================================");
  console.log("✅ [NAVER INDEXNOW API 전송 완료] 전 포털 실시간 색인 요청 완수!");
  console.log("==================================================\n");
}

main();
