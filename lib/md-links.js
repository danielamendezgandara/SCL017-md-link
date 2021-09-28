const pathFile = require('path');
const {
  isFileOrDirectory, checkIsMdFile, validateMdLinksArray, statsMdLinks, statsAndValidateLinks,
} = require('./package-functions');
const readMdFileSync = require('./readMdFileSync');
const readDirectorySync = require('./readDirectorySync');

let pathAbsolute;
let totalLinks;
let fileOrDirectory;
let errorFile;

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  console.log(`\n\x1b[33m Hola ${path},\x1b[0m`);
  if (!pathFile.isAbsolute(path)) {
    pathAbsolute = pathFile.resolve(path);
  } else {
    pathAbsolute = path;
  }
  try {
    if (!isFileOrDirectory(pathAbsolute)) {
      fileOrDirectory = 'archivo';
      if (checkIsMdFile(pathAbsolute)) {
        console.log('\x1b[33m eres un archivo markdown válido\x1b[0m\n');
        console.log('\x1b[32m Analizando tu contenido...\x1b[0m\n');
        totalLinks = readMdFileSync(pathAbsolute);
      } else {
        reject(new Error('\x1b[36m no eres un archivo markdown.No podemos obtener los links.\x1b[0m'));
        totalLinks = [];
      }
    } else {
      totalLinks = readDirectorySync(pathAbsolute);
      fileOrDirectory = 'directorio';
      console.log('\x1b[33m eres un directorio válido\x1b[0m\n');
      console.log('\x1b[32m Analizando tu contenido...\x1b[0m\n');
    }
    if (!options.validate && !options.stats) {
      if (totalLinks.length > 0) {
        resolve(totalLinks);
      } else {
        reject(new Error(`No se encontró ningún link en el ${fileOrDirectory}`));
      }
    } else if (options.validate && options.stats) {
      if (totalLinks.length > 0) {
        validateMdLinksArray(totalLinks)
          .then((res) => resolve(statsAndValidateLinks(res,
            statsMdLinks(totalLinks))))
          .catch((error) => reject(error));
      } else {
        reject(new Error(`No se encontró ningún link en el ${fileOrDirectory}`));
      }
    } else if (options.validate && !options.stats) {
      if (totalLinks.length > 0) {
        validateMdLinksArray(totalLinks)
          .then((res) => resolve(res))
          .catch((error) => reject(error));
      } else {
        reject(new Error(`No se encontró ningún link en el ${fileOrDirectory}`));
      }
    } else if (!options.validate && options.stats) {
      if (totalLinks.length > 0) {
        resolve(statsMdLinks(totalLinks));
      } else {
        reject(new Error(`No se encontró ningún link en el ${fileOrDirectory}`));
      }
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      errorFile = new Error('\x1b[31m Algo salió mal: no eres un archivo o directorio válido.\x1b[0m');
      console.log('\x1b[33m vuelve a intentarlo.\x1b[0m');
    } else {
      errorFile = new Error(`\x1b[31m Error type:${err.message}\x1b[0m`);
    }
    reject(errorFile);
  }
});

module.exports = mdLinks;
