const fs = require('fs');
const path = require('path');

console.log("==================================================");
console.log("🔬 [24시간 관광통역 안내전화 데이터 신규 추가 스크립트]");
console.log("==================================================\n");

const dataPath = path.join(__dirname, '../src/data/customerData.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const newItem = {
  id: 1049,
  name: "한국관광공사 24시간 관광통역안내전화 고객센터",
  phone: "1330",
  hours: "24시간 365일 연중무휴",
  category: "항공·여행",
  description: "한국관광공사에서 운영하는 24시간 365일 무상 관광통역 및 국내외 관광안내 헬프콜(1330) 공식 대표번호 안내 페이지입니다.",
  experienceTip: "한국관광공사 1330 관광통역 안내는 한국어, 영어, 일어, 중어, 러시아어, 베트남어, 태국어, 인니어 등 8개 국어 무료 통역 서비스를 24시간 365일 연중무휴 지원합니다. 국내 이동 중 외국인과의 통화나 위치 안내, 관광 민원 상담 시 1330으로 전화하시면 즉시 전문 통역사와 3자 통화 연결이 가능합니다.",
  subtasks: [
    { title: "관광통역 및 안내 (8개 국어)", phone: "1330" },
    { title: "외국인 관광 불편신고 및 민원", phone: "1330" },
    { title: "지역별 관광 정보 안내 (서울/지방)", phone: "02-1330" }
  ]
};

// Check if already exists
if (fileContent.includes("1330") && fileContent.includes("관광통역")) {
  console.log("🟡 이미 존재하는 데이터입니다.");
} else {
  // Append right before the closing bracket of customerData array
  const lastIndex = fileContent.lastIndexOf('];');
  if (lastIndex !== -1) {
    const jsonStr = `,\n  ${JSON.stringify(newItem, null, 2).replace(/\n/g, '\n  ')}\n`;
    fileContent = fileContent.slice(0, lastIndex) + jsonStr + fileContent.slice(lastIndex);
    fs.writeFileSync(dataPath, fileContent, 'utf8');
    console.log("🟢 신규 데이터 추가 완료! ID: 1049 (항공·여행 카테고리)");
  } else {
    console.error("🔴 customerData.js 배열 종료 지점을 찾을 수 없습니다.");
  }
}

console.log("==================================================");
