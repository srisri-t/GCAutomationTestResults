const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const assetsDir = path.join(publicDir, 'assets');

// Create assets directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Optimize images for web
async function optimizeImages() {
  console.log('🖼️  Optimizing images for production...');
  
  // Create optimized favicon
  const faviconPath = path.join(publicDir, 'favicon.ico');
  if (!fs.existsSync(faviconPath)) {
    // Create a simple cucumber-themed favicon
    await sharp({
      create: {
        width: 32,
        height: 32,
        channels: 4,
        background: { r: 76, g: 175, b: 80, alpha: 1 }
      }
    })
    .png()
    .toFile(faviconPath.replace('.ico', '.png'));
    
    console.log('✅ Created favicon');
  }
  
  // Create demo screenshots (placeholder)
  const screenshots = [
    { name: 'dashboard-screenshot.png', width: 1200, height: 800 },
    { name: 'report-details-screenshot.png', width: 1200, height: 800 },
    { name: 'dark-theme-screenshot.png', width: 1200, height: 800 }
  ];
  
  for (const screenshot of screenshots) {
    const screenshotPath = path.join(assetsDir, screenshot.name);
    if (!fs.existsSync(screenshotPath)) {
      await sharp({
        create: {
          width: screenshot.width,
          height: screenshot.height,
          channels: 4,
          background: { r: 245, g: 245, b: 245, alpha: 1 }
        }
      })
      .png({ quality: 80, progressive: true })
      .toFile(screenshotPath);
      
      console.log(`✅ Created ${screenshot.name}`);
    }
  }
  
  console.log('🎉 Image optimization complete!');
}

// Run optimization
optimizeImages().catch(console.error);