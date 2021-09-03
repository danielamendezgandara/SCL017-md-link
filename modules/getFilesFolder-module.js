 const fs = require('fs');

 fs.readdir('../test',(err,files) =>{
   if(err){
     console.log('error:',err);
   }else{
       console.log('files :',files);
   }
 });