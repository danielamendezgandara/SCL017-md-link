 const fs = require('fs');

 const folder = process.argv[2];

 fs.readdir(folder,(err,files) =>{
   if(err){
     console.log('error:',err);
   }else{
       console.log('files :',files);
   }
 });