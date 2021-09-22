
const fs=require('fs');
const path = require('path');
const {checkIsMdFile}= require('../package-functions');
//const readMdFileSync =require('./readMdFileSync');


jest.mock('fs');
//jest.mock('readMdFileSync');




const readDirectorySync = (dir) =>{
    let filesDirectory =[];
    let listFiles =fs.readdirSync(dir);
    listFiles.forEach((file)=>{
       file=dir + '/' + file;
           if(checkIsMdFile(file)){
             filesDirectory.push(readMdFileSync(file));
           }
  
       });
   console.log(filesDirectory);
   return filesDirectory ;
  };

  module.exports = readDirectorySync;