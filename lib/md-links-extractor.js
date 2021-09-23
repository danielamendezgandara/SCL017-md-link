const pathFile = require('path');
const {
  isFileOrDirectory, checkIsMdFile, validateMdLinksArray, statsMdLinks, statsAndValidateLinks,
} = require('./package-functions');
const readMdFileSync = require('./readMdFileSync');
const readDirectorySync = require('./readDirectorySync');

let newPath;

const mdLinks = (path, options) => new Promise((resolve) => {
  if (!pathFile.isAbsolute(path)) {
    newPath = pathFile.resolve(path);
  } else {
    newPath = path;
  }
  if (!options.validate && !options.stats) {
    if (!isFileOrDirectory(newPath)) {
      if (checkIsMdFile(newPath)) {
        console.log('Es archivo markdown');
        if (readMdFileSync(newPath).length > 0) {
          resolve(readMdFileSync(newPath));
        } else {
          resolve({ message: 'no se encontró ningún link', accion: 0 });
        }
      } else {
        resolve('No es un archivo markdown');
      }
    } else {
      console.log('Es un directorio');
      if (readDirectorySync(newPath).length > 0) {
        resolve(readDirectorySync(newPath));
      }
    }
  }
  if (options.validate && options.stats) {
    if (!isFileOrDirectory(newPath)) {
      if (checkIsMdFile(newPath)) {
        console.log('Es archivo markdown');
        if (readMdFileSync(newPath).length > 0) {
          validateMdLinksArray(readMdFileSync(newPath))
            .then((res) => resolve(statsAndValidateLinks(res,
              statsMdLinks(readMdFileSync(newPath)))));
        } else {
          resolve({ message: 'no se encontró ningún link', accion: 0 });
        }
      }
    } else {
      console.log('Es un directorio');
      if (readDirectorySync(newPath).length > 0) {
        validateMdLinksArray(readDirectorySync(newPath))
          .then((res) => resolve(statsAndValidateLinks(res,
            statsMdLinks(readDirectorySync(newPath)))));
      }
    }
  }

  if (options.validate && !options.stats) {
    if (!isFileOrDirectory(newPath)) {
      if (checkIsMdFile(newPath)) {
        console.log('Es archivo markdown');
        if (readMdFileSync(newPath).length > 0) {
          validateMdLinksArray(readMdFileSync(newPath))
            .then((res) => resolve(res));
        } else {
          resolve({ message: 'no se encontró ningún link', accion: 0 });
        }
      }
    } else {
      console.log('Es un directorio');
      if (readDirectorySync(newPath).length > 0) {
        validateMdLinksArray(readDirectorySync(newPath))
          .then((res) => resolve(res));
      }
    }
  }

  if (options.validate === false && options.stats) {
    if (!isFileOrDirectory(newPath)) {
      if (checkIsMdFile(newPath)) {
        console.log('Es archivo markdown');
        if (readMdFileSync(newPath).length > 0) {
          resolve(statsMdLinks(readMdFileSync(newPath)));
        } else {
          console.log('No es un archivo markdown');
          resolve({ message: 'no se encontró ningún link', accion: 0 });
        }
      }
    } else {
      console.log('Es un directorio');
      if (readDirectorySync(newPath).length > 0) {
        resolve(statsMdLinks(readDirectorySync(newPath)));
      }
    }
  }
});

module.exports = mdLinks;
