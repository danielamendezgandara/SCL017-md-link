const fs = require('fs');
const path = require('path');
const readMdFileSync = require('./readMdFileSync');
const { isFileOrDirectory, checkIsMdFile } = require('./package-functions');

const readDirectorySync = (dir) => {
  let filesDirectory = [];
  const listFiles = fs.readdirSync(dir);
  listFiles.forEach((file) => {
    let pathFile = file;
    pathFile = path.join(dir, file);
    if (isFileOrDirectory(pathFile)) {
      filesDirectory = filesDirectory.concat(readDirectorySync(pathFile));
    } else if (checkIsMdFile(pathFile)) {
      filesDirectory = filesDirectory.concat(readMdFileSync(pathFile));
    }
  });
  return filesDirectory;
};

module.exports = readDirectorySync;
