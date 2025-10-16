const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const testResultsDir = path.join(publicDir, 'TestResultsJsons');

// Preload and validate demo data
function preloadDemoData() {
  console.log('📊 Preloading demo data...');
  
  try {
    // Check if index.json exists
    const indexPath = path.join(testResultsDir, 'index.json');
    if (!fs.existsSync(indexPath)) {
      console.error('❌ index.json not found');
      process.exit(1);
    }
    
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    console.log(`📋 Found ${index.length} demo reports`);
    
    // Validate each report file
    let validReports = 0;
    for (const report of index) {
      const reportPath = path.join(testResultsDir, report.filename);
      if (fs.existsSync(reportPath)) {
        try {
          const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
          if (Array.isArray(reportData) && reportData.length > 0) {
            validReports++;
            console.log(`✅ ${report.name} - ${report.scenarios} scenarios`);
          } else {
            console.warn(`⚠️  ${report.name} - Invalid format`);
          }
        } catch (error) {
          console.error(`❌ ${report.name} - Parse error: ${error.message}`);
        }
      } else {
        console.error(`❌ ${report.name} - File not found: ${report.filename}`);
      }
    }
    
    console.log(`🎉 Demo data validation complete: ${validReports}/${index.length} reports valid`);
    
    if (validReports === 0) {
      console.error('❌ No valid demo reports found');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Demo data preload failed:', error.message);
    process.exit(1);
  }
}

// Run preload
preloadDemoData();