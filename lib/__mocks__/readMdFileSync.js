const fs = require('fs');
const { getLinksMdFile } = require('../package-functions');

jest.mock('fs');

const readMdFileSync = (mdFile) => {
  const mdLinksArrayObject = [];
  const dataFile = fs.readFileSync(mdFile).toString();
  const obj = {
    file: mdFile.replace(RegExp(/\\/g), '/'),
    data: dataFile,
  };

  mdLinksArrayObject.push(...getLinksMdFile(obj));
  return mdLinksArrayObject;
};

module.exports = readMdFileSync;
