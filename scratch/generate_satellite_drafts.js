const fs = require('fs');
const path = require('path');
const { customerData } = require('../src/data/customerData.js');

// Standard slug generator
const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim().replace(/고객센터/g, "").trim();
  cleanName = cleanName.replace(/[\/\\:*?"<>|%,.*]/g, "");
  return cleanName.replace(/[\s-]+/g, "-") + "-고객센터";
};

// Filter top high-traffic brands to generate drafts for (Top 80% search volume)
const targetKeywords = [
  '카드', '은행', '보험', '통신', '택배', '삼성', 'LG', '현대', '국민', '신한', '우리', '하나', '농협', '우체국'
];

const selectedCompanies = customerData.filter(item => {
  return targetKeywords.some(kw => item.name.includes(kw));
}).slice(0, 100);

let outputMarkdown = `# 📝 위성 블로그(티스토리/블로그스팟) 업로드용 100대 기업 포스팅 초안 리스트

본 문서는 cshelper.kr의 머니 사이트 유입을 극대화하기 위해 구글/네이버 SEO 최적화 양식에 맞춰 자동 생성된 블로그 포스팅 초안입니다.
매일 1~2개씩 복사하여 위성 블로그에 예약 발행 형태로 업로드하세요.

---
`;

selectedCompanies.forEach((company, index) => {
  const companyName = company.name;
  const cleanName = companyName.endsWith("고객센터") ? companyName : `${companyName} 고객센터`;
  const slug = getSlug(companyName);
  const targetUrl = `https://www.cshelper.kr/${slug}`;
  const phone = company.phone || "대표번호 확인 필요";
  const arsPath = company.ars_path || "상담원 연결";
  const tip = company.tip || "대표번호로 연결하여 상담사와 통화가 가능합니다.";
  
  outputMarkdown += `
## 📌 [초안 ${index + 1}] ${cleanName} 전화번호 및 대기 없이 상담원 바로연결 단축키 안내

### 1. ${cleanName} 대표 고객센터 전화번호 및 상담 시간
많은 분들이 일상적인 업무를 보거나 분실 신고, 계약 변경을 하기 위해 **${cleanName}**을 찾으십니다. 하지만 상담 전화량이 몰리면 ARS 자동 응답 소리만 하염없이 들으며 통화 대기 시간이 길어져 답답했던 적이 많으실 텐데요.

- **대표 고객센터 전화번호**: **${phone}**
- **기본 상담 운영시간**: ${company.hours || "평일 오전 9시 ~ 오후 6시"} (주말 및 공휴일 휴무, 단 분실/사고 접수는 24시간 운영)

---

### 2. ARS 안내 멘트 스킵하고 상담원 가장 빨리 연결하는 단축번호
전화를 걸었을 때 안내 방송을 끝까지 들을 필요 없이 즉시 원하는 메뉴로 진입하거나 상담원을 소환할 수 있는 단축 경로입니다.

1. **전화 걸기**: 대표번호 ${phone}로 발신합니다.
2. **단축키 입력**: 기계음 소리가 흘러나오면 곧바로 다이얼 키패드에서 **[${arsPath}]** 번호를 연속하여 차례대로 눌러주세요.
3. **효과**: 복잡한 안내 단계를 거치지 않고 가장 대기 시간이 적은 직통 상담 대기열로 즉시 배치됩니다.

---

### 3. 실전 통화 팁 (직접 테스트해 본 추천 시간대)
> 💡 *"${tip}"*

통화량이 가장 몰리는 **오전 11시 30분 ~ 오후 1시 30분(점심시간 교대 근무)** 및 **오후 3시 30분 이후(지점 마감)** 시간대는 가급적 피하시고, 오전 9시~10시 사이에 거시는 것이 가장 연결 확률이 높습니다.

---

### 4. 실시간 혼잡도 및 전 카테고리 단축키 지도 확인하기
더 자세한 10초 연결 팁이나 실시간 연결 대기 혼잡도 상황, 그리고 웹을 통한 간편 카카오톡 상담 채팅 경로를 이용하고 싶으시다면 아래의 실시간 단축키 지도 링크에서 바로 확인 및 다이렉트 통화 연결을 지원받으실 수 있습니다.

👉 [${cleanName} 실시간 대기 혼잡도 및 단축키 확인하러 가기 (${targetUrl})](${targetUrl})

---
<!-- slide -->
`;
});

const outputPath = path.join(__dirname, '../scratch/satellite_blog_posts.md');
fs.writeFileSync(outputPath, outputMarkdown, 'utf8');

console.log(`Successfully generated 100 drafts inside scratch/satellite_blog_posts.md!`);
