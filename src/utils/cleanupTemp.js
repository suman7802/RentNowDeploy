const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, '../../tmp');

function cleanFolder() {
  try {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        fs.unlinkSync(filePath);
      } else if (stats.isDirectory()) {
        cleanFolder(filePath);
        fs.rmdirSync(filePath);
      }
    }
    console.log(`Folder cleaned: ${folderPath}`);
  } catch (error) {
    console.error(`Error cleaning folder: ${error.message}`);
  }
}
module.exports = cleanFolder;
