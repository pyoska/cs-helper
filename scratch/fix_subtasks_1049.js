const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/customerData.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

// Replace subtasks for 1330 entry to ensure both name and title exist
fileContent = fileContent.replace(
  `subtasks: [\n    { title: "관광통역 및 안내 (8개 국어)", phone: "1330" },\n    { title: "외국인 관광 불편신고 및 민원", phone: "1330" },\n    { title: "지역별 관광 정보 안내 (서울/지방)", phone: "02-1330" }\n  ]`,
  `subtasks: [\n    { name: "관광통역 및 안내 (8개 국어)", title: "관광통역 및 안내 (8개 국어)", phone: "1330" },\n    { name: "외국인 관광 불편신고 및 민원", title: "외국인 관광 불편신고 및 민원", phone: "1330" },\n    { name: "지역별 관광 정보 안내 (서울/지방)", title: "지역별 관광 정보 안내 (서울/지방)", phone: "02-1330" }\n  ]`
);

fs.writeFileSync(dataPath, fileContent, 'utf8');
console.log("🟢 Fixed entry 1049 subtasks properties in customerData.js!");
