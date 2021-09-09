//'use strict';

/*const path = require('path');*/

/*const getFiles = (folder,extension,callback)=>{
    const fs = require('fs');
    const path = require('path');
    fs.readdir(folder,(error,data)=>{
        if(error){
            return callback(error);
        }
        const files=data.filter((file) =>{
            return path.extname(file) === '.' + extension
               
            });
        callback(null,files);
    });
};
module.exports= getFiles;

'use strict';
const mymodule= require('./mymodule');

const folder = process.argv[2];
const ext = process.argv[3];

mymodule(folder,ext,(err,data)=>{
    if (err) {
        console.log(err);
        return;
    }
      data.forEach((file)=>{
        console.log(file)}); 
});*/


const a= process.argv[2];

const walk = function(dir) { 
    let results = [];
    const fs = require('fs');
    //const path =require('path');
    const list = fs.readdirSync(dir) 
    list.forEach(function(file) { 
        file = dir + '/' + file;
        console.log(file);
        const stat = fs.statSync(file) ;
        if (stat && stat.isDirectory()){
            results = results.concat(walk(file)) ;

        }else{
            results.push(file);
        }}) ;
        return results 
}

console.log(walk(a));
