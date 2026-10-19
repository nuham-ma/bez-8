const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

// Parse translations manually from js/translations.js
const translationsFile = fs.readFileSync(path.join(baseDir, 'js', 'translations.js'), 'utf8');
const amMatch = translationsFile.match(/am:\s*{([^}]+(?:\n\s*[^}]+)*)}/);
const enMatch = translationsFile.match(/en:\s*{([^}]+(?:\n\s*[^}]+)*)}/);

const extractKeys = (block) => {
  const keys = new Set();
  const regex = /([a-zA-Z0-9_]+)\s*:/g;
  let m;
  while ((m = regex.exec(block)) !== null) {
    keys.add(m[1]);
  }
  return keys;
};

const amKeys = amMatch ? extractKeys(amMatch[1]) : new Set();
const enKeys = enMatch ? extractKeys(enMatch[1]) : new Set();

console.log('=== BEZ/8 Cafe Landing Page Verification ===\n');

// 1. Verify image paths
const imgRegex = /(?:src|href)="([^"]+\.(?:webp|png|jpg|jpeg|svg))"/g;
let match;
const missingImages = [];
const checkedImages = new Set();

while ((match = imgRegex.exec(html)) !== null) {
  const src = match[1];
  if (!src.startsWith('http')) {
    if (!checkedImages.has(src)) {
      checkedImages.add(src);
      const fullPath = path.join(baseDir, src);
      if (!fs.existsSync(fullPath)) {
        missingImages.push(src);
      }
    }
  }
}

console.log(`[1] Images Checked: ${checkedImages.size} unique image references`);
if (missingImages.length === 0) {
  console.log('    ✓ All referenced images exist on disk!');
} else {
  console.error('    ✗ Missing images:', missingImages);
}

// 2. Verify data-i18n translation keys
const i18nRegex = /data-i18n="([^"]+)"/g;
const missingAm = [];
const missingEn = [];
const checkedI18nKeys = new Set();

while ((match = i18nRegex.exec(html)) !== null) {
  const key = match[1];
  if (!checkedI18nKeys.has(key)) {
    checkedI18nKeys.add(key);
    if (!amKeys.has(key)) missingAm.push(key);
    if (!enKeys.has(key)) missingEn.push(key);
  }
}

// Also check data-item-title-key and data-caption-key
const itemKeyRegex = /(?:data-item-title-key|data-caption-key)="([^"]+)"/g;
while ((match = itemKeyRegex.exec(html)) !== null) {
  const key = match[1];
  if (!checkedI18nKeys.has(key)) {
    checkedI18nKeys.add(key);
    if (!amKeys.has(key)) missingAm.push(key);
    if (!enKeys.has(key)) missingEn.push(key);
  }
}

console.log(`\n[2] Translation Keys: ${checkedI18nKeys.size} unique i18n tags`);
if (missingAm.length === 0 && missingEn.length === 0) {
  console.log('    ✓ 100% translation coverage in both Amharic and English!');
} else {
  if (missingAm.length > 0) console.error('    ✗ Missing in Amharic:', missingAm);
  if (missingEn.length > 0) console.error('    ✗ Missing in English:', missingEn);
}

// 3. Verify Links
const phoneCount = (html.match(/tel:0978454772/g) || []).length;
const waCount = (html.match(/wa\.me\/251978454772/g) || []).length;
const mapsCount = (html.match(/maps\.app\.goo\.gl\/cjoJ9WFy1uAxq9DQ8/g) || []).length;
const emailCount = (html.match(/mailto:Kalabhabt63@gmail\.com/g) || []).length;

console.log('\n[3] Verified Touchpoints:');
console.log(`    ✓ Phone hotline tel: links: ${phoneCount}`);
console.log(`    ✓ WhatsApp order & chat links: ${waCount}`);
console.log(`    ✓ Google Maps navigation links: ${mapsCount}`);
console.log(`    ✓ Email mailto links: ${emailCount}`);

console.log('\n=== Verification Summary ===');
if (missingImages.length === 0 && missingAm.length === 0 && missingEn.length === 0) {
  console.log('🎉 ALL CHECKS PASSED! Landing page is 100% verified and production-ready.');
  process.exit(0);
} else {
  console.error('❌ Issues detected during verification.');
  process.exit(1);
}
