const fs = require('fs');
const { checkIsMdFile } = require('../package-functions');
const readMdFileSync = require('./readMdFileSync');

jest.mock('fs');

const readDirectorySync = (dir) => {
  let filesDirectory = [];
  const listFiles = fs.readdirSync(dir);
  listFiles.forEach((file) => {
    let pathFile = file;
    pathFile = `${dir}/${file}`;
    if (checkIsMdFile(pathFile)) {
      filesDirectory = filesDirectory.concat(readMdFileSync(pathFile));
    }
  });
  return filesDirectory;
};

module.exports = readDirectorySync;
