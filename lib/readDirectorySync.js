
const readDirectorySync = (dir) =>{
    let filesDirectory =[];
    let listFiles =fs.readdirSync(dir);
    listFiles.forEach((file)=>{
       file=path.join(dir,file);
       if (isFileOrDirectory(file)){
           filesDirectory = filesDirectory.concat(readDirectorySync(file)) ;
       }else{
           if(checkIsMdFile(file)){
             filesDirectory=filesDirectory.concat(readMdFileSync(file));
           }
  
       }
       
   });
   return filesDirectory ;
  };

module.exports = readDirectorySync;