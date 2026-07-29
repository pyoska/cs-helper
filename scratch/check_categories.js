const { customerData } = require('../src/data/customerData.js');

const cats = new Set(customerData.map(x => x.category));
console.log("Existing categories:", Array.from(cats));

const publicItems = customerData.filter(x => x.category === '공공');
console.log(`Total '공공' items: ${publicItems.length}`);
console.log("Sample '공공' items:", publicItems.slice(0, 5).map(x => x.name));
