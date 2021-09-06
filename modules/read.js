const fs=require('fs');

const file = process.argv[2];

fs.readFile(file,'utf-8',(err,data)=>{
    if(err){
        console.log('error:',err);
    }else{
        console.log('data :',data);
    }
});