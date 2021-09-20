
const pathFile= require('path');
const {isFileOrDirectory,checkIsMdFile,readMdFileSync,readDirectorySync, validateMdLinksArray, statsMdLinks, statsAndValidateLinks} = require('./package-functions');


const options ={
    validate : false,
    stats :false,
}
const mdLinks = (path,options)=>{
     return new Promise ((resolve)=>{
       if (!pathFile.isAbsolute(path)){
            path = pathFile.resolve(path);
        }
        if(!options.validate && !options.stats){
            if(!isFileOrDirectory(path)){
                if(checkIsMdFile(path)){
                    if(readMdFileSync(path).length >0){
                        resolve(readMdFileSync(path))
                    }else{
                        resolve({message: 'no se encontró ningún link',accion : 0});
                    }
                    
                }//statsAndValidateLinks(readDirectorySync(path),validateMdLinksArray(readDirectorySync(path)))
            }else{
                if(readDirectorySync(path).length>0){
                    resolve(readDirectorySync(path));
                }
            }
    
        }
    if(options.validate && options.stats){
        if(!isFileOrDirectory(path)){
            if(checkIsMdFile(path)){
                if(readMdFileSync(path).length >0){
                    validateMdLinksArray(readMdFileSync(path))
                   .then(res => resolve(statsAndValidateLinks(res,statsMdLinks(readMdFileSync(path)))));
                   
                }else{
                    resolve({message: 'no se encontró ningún link',accion : 0});
                }
                
            }
        }else{
            if(readDirectorySync(path).length>0){
                validateMdLinksArray(readDirectorySync(path))
                   .then(res=>resolve(statsAndValidateLinks(res,statsMdLinks(readDirectorySync(path)))));
            }
        }

    }

    if(options.validate && options.stats==false){
        if(!isFileOrDirectory(path)){
            if(checkIsMdFile(path)){
                if(readMdFileSync(path).length >0){
                    validateMdLinksArray(readMdFileSync(path))
                   .then(res =>resolve(res));
                }else{
                    resolve({message: 'no se encontró ningún link',accion : 0});
                }
                
            }
        }else{
            if(readDirectorySync(path).length>0){
                validateMdLinksArray(readDirectorySync(path))
                   .then(res=>resolve(res));
            }
        }
    }

    if(options.validate ===false && options.stats){
        if(!isFileOrDirectory(path)){
            if(checkIsMdFile(path)){
                if(readMdFileSync(path).length >0){

                    resolve(statsMdLinks(readMdFileSync(path)))
                    
                }else{
                    resolve({message: 'no se encontró ningún link',accion : 0});
                }
                
            }
        }else{
            if(readDirectorySync(path).length>0){
                resolve(statsMdLinks(readDirectorySync(path)))
            }
        }


    }
    });
}
     
      
mdLinks('../md',options).then(result=>console.log(result))
.catch(error =>console.log(error.message));