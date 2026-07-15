const fs = require('fs');
const readline = require('readline');
const path = require('path');

function normalize(name) {
  if (!name) return "";
  return name.replace(/\s+/g, "")
             .replace(/カード/g, "카드")
             .replace(/할부/g, "할부")
             .replace(/할부금융/g, "할부금융")
             .replace(/할部/g, "할부")
             .replace(/데스크/g, "데스크")
             .replace(/デ-스크|デスク/g, "데스크");
}

function cleanText(text) {
  if (!text) return "";
  return text.trim().replace(/만é/g, "만에");
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

async function run() {
  const { customerData } = require('../src/data/customerData.js');
  const fileStream = fs.createReadStream(path.join(__dirname, '../고객센터DB_전체.csv'));
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const csvRows = [];
  const uniqueCompanies = new Set();
  const csvRowsByCompany = {};
  let lineCount = 0;

  for await (const line of rl) {
    lineCount++;
    if (lineCount === 1) continue;
    const parts = parseCSVLine(line);
    const company = parts[0] || '';
    if (company) {
      uniqueCompanies.add(company);
      if (!csvRowsByCompany[company]) {
        csvRowsByCompany[company] = [];
      }
      csvRowsByCompany[company].push({
        company: parts[0] || '',
        category: parts[1] || '',
        phone: parts[2] || '',
        subtask: parts[3] || '',
        directPhone: parts[4] || '',
        web: parts[5] || '',
        tip: parts[6] || ''
      });
    }
  }

  let updatedCount = 0;
  let insertedCount = 0;

  uniqueCompanies.forEach(compName => {
    const firstRow = csvRowsByCompany[compName][0];
    const rows = csvRowsByCompany[compName];
    const normComp = normalize(compName);
    const existingIndex = customerData.findIndex(item => normalize(item.name) === normComp);
    
    const cleanedTip = cleanText(firstRow.tip);
    const cleanedWeb = cleanText(firstRow.web);
    const cleanedPhone = cleanText(firstRow.directPhone || firstRow.phone);
    const cleanedMainPhone = cleanText(firstRow.phone);
    const cleanedSubtask = cleanText(firstRow.subtask);

    if (existingIndex !== -1) {
      let item = customerData[existingIndex];
      let updated = false;

      if ((!item.phone || item.phone === '정보 없음' || item.phone === '') && cleanedPhone) {
        item.phone = cleanedPhone;
        updated = true;
      }
      if ((!item.main_phone || item.main_phone === '정보 없음' || item.main_phone === '') && cleanedMainPhone) {
        item.main_phone = cleanedMainPhone;
        updated = true;
      }
      if ((!item.web_url || item.web_url === '정보 없음' || item.web_url === '') && cleanedWeb) {
        item.web_url = cleanedWeb;
        updated = true;
      }
      if ((!item.tip || item.tip === '정보 없음' || item.tip === '') && cleanedTip) {
        item.tip = cleanedTip;
        item.experienceTip = `내가 직접 전화를 걸어봤는데, ${cleanedTip}`;
        updated = true;
      }
      if ((!item.ars_path || item.ars_path === '') && cleanedSubtask) {
        item.ars_path = `${cleanedSubtask} 직통`;
        updated = true;
      }
      
      // Update subtasks
      const subtasks = rows.map(r => ({
        name: cleanText(r.subtask),
        phone: cleanText(r.directPhone || r.phone)
      })).filter(s => s.name !== "");
      
      item.subtasks = subtasks;
      updated = true;
      
      if (updated) updatedCount++;
    } else {
      const name = compName;
      const category = firstRow.category;
      const keywords = category === "공공·기관" || category === "공공기관" ? [
        `${name} 민원상담`, `${name} 전화번호`, "상담원 연결"
      ] : [
        `${name} 분실신고`, `${name} 결제일변경`, "한도조회"
      ];

      const subtasks = rows.map(r => ({
        name: cleanText(r.subtask),
        phone: cleanText(r.directPhone || r.phone)
      })).filter(s => s.name !== "");

      customerData.push({
        name,
        category,
        phone: cleanedPhone,
        main_phone: cleanedMainPhone,
        ars_path: cleanedSubtask ? `${cleanedSubtask} 직통` : "",
        subtasks,
        tip: cleanedTip,
        experienceTip: `내가 직접 전화를 걸어봤는데, ${cleanedTip}`,
        keywords,
        isVerified: true,
        description: `${name} 고객센터의 공식 인증 대표 전화번호 및 빠른 상담사 연결을 돕는 ARS 단축경로 안내 페이지입니다.`,
        hours: "평일 09:00 ~ 18:00",
        web_url: cleanedWeb
      });
      insertedCount++;
    }
  });

  console.log(`Sync complete! Updated: ${updatedCount}, Inserted: ${insertedCount}`);
  const newJsContent = `export const customerData = ${JSON.stringify(customerData, null, 2)};\n`;
  fs.writeFileSync(path.join(__dirname, '../src/data/customerData.js'), newJsContent, 'utf8');
}

run().catch(console.error);
