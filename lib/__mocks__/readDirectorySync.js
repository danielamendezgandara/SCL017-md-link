
const fs=require('fs');
const {checkIsMdFile}= require('../package-functions');
const readMdFileSync =require('./readMdFileSync');

jest.mock('fs');

const readDirectorySync = (dir) =>{
    let filesDirectory =[];
    let listFiles =fs.readdirSync(dir);
    listFiles.forEach((file)=>{
       file=dir + '/' + file;
           if(checkIsMdFile(file)){
             filesDirectory=filesDirectory.concat(readMdFileSync(file));
           }
  
       });
   return filesDirectory ;
  };

  module.exports = readDirectorySync;