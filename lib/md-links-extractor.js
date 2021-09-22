
const pathFile= require('path');
const {isFileOrDirectory,checkIsMdFile, validateMdLinksArray, statsMdLinks, statsAndValidateLinks} = require('./package-functions');
const readMdFileSync =require('./readMdFileSync');
const readDirectorySync =require('./readDirectorySync');

const mdLinks = (path,options)=>{
     return new Promise ((resolve)=>{
       if (!pathFile.isAbsolute(path)){
            path = pathFile.resolve(path);
        }
        if(!options.validate && !options.stats){
            if(!isFileOrDirectory(path)){
                if(checkIsMdFile(path)){
                    console.log('Es archivo markdown');
                    if(readMdFileSync(path).length >0){
                        resolve(readMdFileSync(path))
                    }else{
                        resolve({message: 'no se encontró ningún link',accion : 0});
                    }
                    
                }else{
                    resolve('No es un archivo markdown');
                }
            }else{
                console.log('Es un directorio');
                if(readDirectorySync(path).length>0){
                    resolve(readDirectorySync(path));
                }
            }
    
        }
    if(options.validate && options.stats){
        if(!isFileOrDirectory(path)){
            if(checkIsMdFile(path)){
                console.log('Es archivo markdown');
                if(readMdFileSync(path).length >0){
                    validateMdLinksArray(readMdFileSync(path))
                   .then(res => resolve(statsAndValidateLinks(res,statsMdLinks(readMdFileSync(path)))));
                   
                }else{
                    resolve({message: 'no se encontró ningún link',accion : 0});
                }
                
            }
        }else{
            console.log('Es un directorio');
            if(readDirectorySync(path).length>0){
                validateMdLinksArray(readDirectorySync(path))
                   .then(res=>resolve(statsAndValidateLinks(res,statsMdLinks(readDirectorySync(path)))));
            }
        }

    }

    if(options.validate && options.stats==false){
        if(!isFileOrDirectory(path)){
            if(checkIsMdFile(path)){
                console.log('Es archivo markdown');
                if(readMdFileSync(path).length >0){
                    validateMdLinksArray(readMdFileSync(path))
                   .then(res =>resolve(res));
                }else{
                    resolve({message: 'no se encontró ningún link',accion : 0});
                }
                
            }
        }else{
            console.log('Es un directorio');
            if(readDirectorySync(path).length>0){
                validateMdLinksArray(readDirectorySync(path))
                   .then(res=>resolve(res));
            }
        }
    }

    if(options.validate ===false && options.stats){
        if(!isFileOrDirectory(path)){
            
            if(checkIsMdFile(path)){
                console.log('Es archivo markdown');
                if(readMdFileSync(path).length >0){

                    resolve(statsMdLinks(readMdFileSync(path)))
                    
                }else{
                    console.log('No es un archivo markdown');
                    resolve({message: 'no se encontró ningún link',accion : 0});
                }
                
            }
        }else{
            console.log('Es un directorio');
            if(readDirectorySync(path).length>0){
                resolve(statsMdLinks(readDirectorySync(path)))
            }
        }


    }
    });
}
     
      


module.exports = mdLinks;