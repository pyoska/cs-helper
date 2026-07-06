const fs = require('fs');
const path = require('path');
const { customerData } = require('../src/data/customerData.js');

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Slug helper function matching the detail route logic
const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim().replace(/고객센터/g, "").trim();
  cleanName = cleanName.replace(/[\/\\:*?"<>|%,.*]/g, "");
  return cleanName.replace(/[\s-]+/g, "-") + "-고객센터";
};

// 1. Generate sitemap.xml
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.cshelper.kr/</loc>
    <lastmod>2026-07-06</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.cshelper.kr/about</loc>
    <lastmod>2026-07-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;

// 1a. Add company detail pages
customerData.forEach((item) => {
  const slug = getSlug(item.name);
  const encodedSlug = encodeURIComponent(slug);
  sitemapXml += `  <url>
    <loc>https://www.cshelper.kr/${encodedSlug}</loc>
    <lastmod>2026-07-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

// 1b. Add tag landing pages
const uniqueTags = new Set();
customerData.forEach((item) => {
  if (item.keywords) {
    item.keywords.forEach((kw) => {
      const tag = kw.split(" ").pop();
      if (tag) uniqueTags.add(tag);
    });
  }
});

uniqueTags.forEach((tag) => {
  const encodedTag = encodeURIComponent(tag);
  sitemapXml += `  <url>
    <loc>https://www.cshelper.kr/tag/${encodedTag}</loc>
    <lastmod>2026-07-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
});

// 1c. Add category landing pages
const categories = ["카드", "은행", "통신", "가전", "보험", "배달·쇼핑", "항공·여행", "IT·플랫폼", "자동차", "증권", "기타"];
categories.forEach((cat) => {
  const encodedCat = encodeURIComponent(cat);
  sitemapXml += `  <url>
    <loc>https://www.cshelper.kr/category/${encodedCat}</loc>
    <lastmod>2026-07-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
});

sitemapXml += `</urlset>`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('sitemap.xml successfully generated in public/ directory!');

// 2. Generate rss.xml
let rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>CS 고객센터 도우미</title>
  <link>https://www.cshelper.kr</link>
  <description>대한민국 1,000개 기관의 검증된 고객센터 대표전화 및 최단 연결 ARS 치트키 정보 제공 포털</description>
  <language>ko</language>
  <atom:link href="https://www.cshelper.kr/rss.xml" rel="self" type="application/rss+xml" />
`;

// Add first 50 latest items to feed
customerData.slice(0, 50).forEach((item) => {
  const slug = getSlug(item.name);
  const encodedSlug = encodeURIComponent(slug);
  const companyName = item.name || "";
  const cleanName = companyName.endsWith("고객센터") ? companyName : `${companyName} 고객센터`;

  rssXml += `  <item>
    <title>${cleanName} 전화번호 및 연결 안내</title>
    <link>https://www.cshelper.kr/${encodedSlug}</link>
    <guid>https://www.cshelper.kr/${encodedSlug}</guid>
    <description>${item.description}. 대표전화: ${item.phone}. 운영시간: ${item.hours}. 1인칭 실전 꿀팁: ${item.experienceTip}</description>
    <pubDate>Mon, 06 Jul 2026 00:00:00 GMT</pubDate>
  </item>
`;
});

rssXml += `</channel>
</rss>`;
fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssXml, 'utf8');
console.log('rss.xml successfully generated in public/ directory!');
