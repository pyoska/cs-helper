const { customerData } = require('../src/data/customerData.js');

const topBrands = [
  "삼성카드", "신한카드", "현대카드", "국민카드", "롯데카드", "하나카드", "우리카드", "농협카드",
  "신한은행", "국민은행", "우리은행", "하나은행", "기업은행", "농협은행", "우체국",
  "삼성전자", "LG전자", "SK텔레콤", "KT", "LG유플러스", "쿠팡", "배달의민족",
  "한진택배", "CJ대한통운", "로젠택배", "현대해상", "삼성화재", "DB손해보험", "KB손해보험"
];

console.log('Top 30 High-Traffic Brands in our Database:\n');
topBrands.forEach(brand => {
  const matches = customerData.filter(x => x.name.includes(brand));
  if (matches.length > 0) {
    console.log(`Brand: "${brand}"`);
    matches.slice(0, 2).forEach(item => {
      console.log(`  - Name: "${item.name}" -> Phone: "${item.phone}"`);
    });
  } else {
    console.log(`Brand: "${brand}" -> No matches found!`);
  }
});
