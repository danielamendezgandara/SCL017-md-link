const pathFile = require('path');
const {
  isFileOrDirectory, checkIsMdFile, validateMdLinksArray, statsMdLinks, statsAndValidateLinks,
} = require('./package-functions');
const readMdFileSync = require('./readMdFileSync');
const readDirectorySync = require('./readDirectorySync');

let pathAbsolute;
let totalLinks;
let fileOrDirectory;

const mdLinks = (path, options) => new Promise((resolve) => {
  if (!pathFile.isAbsolute(path)) {
    pathAbsolute = pathFile.resolve(path);
  } else {
    pathAbsolute = path;
  }
  if (!isFileOrDirectory(pathAbsolute)) {
    if (checkIsMdFile(pathAbsolute)) {
      console.log('Es archivo markdown');
      fileOrDirectory = 'archivo';
      totalLinks = readMdFileSync(pathAbsolute);
    } else {
      console.log('No es un archivo markdown');
    }
  } else {
    totalLinks = readDirectorySync(pathAbsolute);
    fileOrDirectory = 'directorio';
    console.log('Es un directorio');
  }

  if (!options.validate && !options.stats) {
    if (totalLinks.length > 0) {
      resolve(totalLinks);
    } else {
      resolve(`No se encontró ningún link en el ${fileOrDirectory}`);
    }
  } else if (options.validate && options.stats) {
    console.log('hola');
    if (totalLinks.length > 0) {
      validateMdLinksArray(totalLinks)
        .then((res) => resolve(statsAndValidateLinks(res,
          statsMdLinks(totalLinks))));
    } else {
      resolve(`No se encontró ningún link en el ${fileOrDirectory}`);
    }
  } else if (options.validate && !options.stats) {
    if (totalLinks.length > 0) {
      validateMdLinksArray(totalLinks)
        .then((res) => resolve(res));
    } else {
      resolve(`No se encontró ningún link en el ${fileOrDirectory}`);
    }
  } else if (!options.validate && options.stats) {
    if (totalLinks > 0) {
      resolve(statsMdLinks(totalLinks));
    } else {
      resolve(`No se encontró ningún link en el ${fileOrDirectory}`);
    }
  }
});

module.exports = mdLinks;
