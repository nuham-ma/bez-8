const fs = require('fs');
const path = require('path');

// Resolve sharp from delmela-restaurant node_modules or local
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  sharp = require('C:/Users/DELLL/.gemini/antigravity/scratch/delmela-restaurant/node_modules/sharp');
}

const uploadsDir = 'C:/Users/DELLL/.gemini/antigravity/brain/afd308a0-0a77-427e-b357-0e082aa83bf6/.user_uploaded';
const baseDir = path.join(__dirname, '..');
const assetsDir = path.join(baseDir, 'assets', 'images');

async function processImages() {
  console.log('--- Processing BEZ/8 Cafe Assets ---');

  // 1. Process Logo
  const logoFile = path.join(uploadsDir, 'media_1792390391827.jpg');
  if (fs.existsSync(logoFile)) {
    const logoOutDir = path.join(assetsDir, 'logo');
    fs.mkdirSync(logoOutDir, { recursive: true });

    // Clean crop around the BEZ/8 Cafe text (leaving comfortable padding)
    // Original is 1024 x 552. The logo is centered.
    await sharp(logoFile)
      .extract({ left: 140, top: 120, width: 744, height: 320 })
      .resize({ width: 600 })
      .webp({ quality: 95 })
      .toFile(path.join(logoOutDir, 'bez8-logo.webp'));

    await sharp(logoFile)
      .extract({ left: 140, top: 120, width: 744, height: 320 })
      .resize({ width: 600 })
      .png()
      .toFile(path.join(logoOutDir, 'bez8-logo.png'));

    console.log('✓ Extracted & saved bez8-logo (.webp & .png)');
  }

  // 2. Extract Individual Photos from Collage 1 (media_1792390403696.jpg: 1024x1024, 2 cols x 3 rows)
  const collage1 = path.join(uploadsDir, 'media_1792390403696.jpg');
  if (fs.existsSync(collage1)) {
    // Cell w: 512, h: 341. Use slight margin to remove border lines.
    const items1 = [
      { name: 'exterior-facade', left: 8, top: 8, width: 496, height: 325, targetDir: 'gallery' },
      { name: 'dish-signature-pizza', left: 8, top: 349, width: 496, height: 325, targetDir: 'menu' },
      { name: 'interior-moss-wall', left: 520, top: 349, width: 496, height: 325, targetDir: 'gallery' },
      { name: 'interior-service-counter', left: 8, top: 690, width: 496, height: 325, targetDir: 'gallery' },
      { name: 'interior-honeycomb-lounge', left: 520, top: 690, width: 496, height: 325, targetDir: 'gallery' }
    ];

    for (const item of items1) {
      const targetPath = path.join(assetsDir, item.targetDir);
      fs.mkdirSync(targetPath, { recursive: true });

      await sharp(collage1)
        .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
        .resize({ width: 1000, withoutEnlargement: true })
        .webp({ quality: 90 })
        .toFile(path.join(targetPath, `${item.name}.webp`));

      await sharp(collage1)
        .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
        .resize({ width: 1000, withoutEnlargement: true })
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(path.join(targetPath, `${item.name}.jpg`));

      console.log(`✓ Saved ${item.name} (.webp & .jpg) in ${item.targetDir}`);
    }
  }

  // 3. Extract Individual Photos from Collage 2 (media_1792390411450.jpg: 1024x1024, 2 cols x 3 rows)
  const collage2 = path.join(uploadsDir, 'media_1792390411450.jpg');
  if (fs.existsSync(collage2)) {
    const items2 = [
      { name: 'interior-pizza-mural', left: 8, top: 8, width: 496, height: 325, targetDir: 'gallery' },
      { name: 'interior-cozy-dining', left: 8, top: 349, width: 496, height: 325, targetDir: 'gallery' },
      { name: 'bar-espresso-station', left: 520, top: 349, width: 496, height: 325, targetDir: 'gallery' },
      { name: 'interior-barstool-hall', left: 8, top: 690, width: 496, height: 325, targetDir: 'gallery' },
      { name: 'interior-main-counter', left: 520, top: 690, width: 496, height: 325, targetDir: 'gallery' }
    ];

    for (const item of items2) {
      const targetPath = path.join(assetsDir, item.targetDir);
      fs.mkdirSync(targetPath, { recursive: true });

      await sharp(collage2)
        .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
        .resize({ width: 1000, withoutEnlargement: true })
        .webp({ quality: 90 })
        .toFile(path.join(targetPath, `${item.name}.webp`));

      await sharp(collage2)
        .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
        .resize({ width: 1000, withoutEnlargement: true })
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(path.join(targetPath, `${item.name}.jpg`));

      console.log(`✓ Saved ${item.name} (.webp & .jpg) in ${item.targetDir}`);
    }
  }

  // 4. Also copy the pizza and espresso station into hero and menu for dedicated cards
  const heroDir = path.join(assetsDir, 'hero');
  fs.mkdirSync(heroDir, { recursive: true });

  fs.copyFileSync(
    path.join(assetsDir, 'gallery', 'interior-honeycomb-lounge.webp'),
    path.join(heroDir, 'hero-lounge.webp')
  );
  fs.copyFileSync(
    path.join(assetsDir, 'gallery', 'interior-honeycomb-lounge.jpg'),
    path.join(heroDir, 'hero-lounge.jpg')
  );
  fs.copyFileSync(
    path.join(assetsDir, 'gallery', 'exterior-facade.webp'),
    path.join(heroDir, 'hero-facade.webp')
  );
  fs.copyFileSync(
    path.join(assetsDir, 'gallery', 'exterior-facade.jpg'),
    path.join(heroDir, 'hero-facade.jpg')
  );
  console.log('✓ Prepared hero images');

  console.log('--- Image Processing Completed Successfully ---');
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
