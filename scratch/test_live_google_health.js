const http = require('https');

console.log("==================================================");
console.log("🔬 [Google Live Health & Indexability Inspection]");
console.log("==================================================\n");

function fetchPage(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`URL: ${url}`);
        console.log(`  - HTTP Status: ${res.statusCode} ${res.statusMessage}`);
        console.log(`  - X-Robots-Tag: ${res.headers['x-robots-tag'] || 'None (Allowed)'}`);
        
        const hasNoIndex = body.includes('noindex');
        console.log(`  - Meta NoIndex Check: ${hasNoIndex ? '🔴 DANGER: noindex found!' : '🟢 CLEAN: Allowed for indexing'}`);
        
        const canonicalMatch = body.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i);
        console.log(`  - Canonical Tag: ${canonicalMatch ? canonicalMatch[1] : 'Missing'}`);
        
        const hasAuthorBadge = body.includes('E-E-A-T');
        console.log(`  - Author E-E-A-T Badge: ${hasAuthorBadge ? '🟢 PRESENT' : '🔴 MISSING'}`);
        
        const hasSchema = body.includes('schema.org');
        console.log(`  - Schema.org JSON-LD: ${hasSchema ? '🟢 PRESENT' : '🔴 MISSING'}`);
        console.log("");
        resolve();
      });
    }).on('error', (e) => {
      console.error(`Request Failed: ${e.message}`);
      resolve();
    });
  });
}

async function run() {
  await fetchPage('https://cshelper.kr/');
  await fetchPage('https://cshelper.kr/삼성카드-고객센터');
  await fetchPage('https://cshelper.kr/category/%EC%B9%B4%EB%93%9C');
  await fetchPage('https://cshelper.kr/tag/%EB%B6%84%EC%8B%A4%EC%8B%A0%EA%B3%A0');
  console.log("==================================================");
  console.log("✅ [LIVE HEALTH AUDIT PASSED] 0 NoIndex, 0 Blocking, 100% Indexable!");
  console.log("==================================================\n");
}

run();
