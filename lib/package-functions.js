const fs=require('fs');
const path = require ('path');

const callback = (error,data) =>{
    if(error){
        console.log(error);
    }
    console.log(data);
}

const isFileOrDirectory = (path) =>{
    try {
        const stats = fs.statSync(path);
        return stats.isDirectory();
    } catch (err) {
         const error = new Error (`Error type:${err.message}`);
         return error.message;
      }
};

const checkIsMdFile = (file) =>{
     const extension = path.extname(file.toLowerCase());
     const extensionMd = '.md';
     return extension === extensionMd;
};

const readDirectorySync = (dir) =>{
     let filesDirectory =[];
     const listFiles =fs.readdirSync(dir);
     listFiles.forEach((file)=>{
        file = dir + '/' + file;
        if (isFileOrDirectory(file)){
            filesDirectory = filesDirectory.concat(readDirectorySync(file)) ;
        }else{
            if(checkIsMdFile(file)){
                fs.readFile(file,'utf-8',(err,data)=>{
                    if(err){
                        console.log('error:',err);
                    }else{
                        console.log('data :',data);
                        getLinksMdFile(data);
                    }
                });
              filesDirectory.push(file);
            }
        }
        
    });
    return filesDirectory;
};

const readDirectoryAsync = (dir, callback)=>{

    var results = []; 
    fs.readdir(dir, (err, list)=>{
    if (err) 
    return callback(err); 
    var i = 0; 
    (function next() {
      var file = list[i++]; 
      if (!file) 
      return callback(null, results);
      file = dir + '/' + file; 
      fs.stat(file,(stat)=>{ 
        if (stat && stat.isDirectory()) { 
           walk(file,(res)=> { 
           results = results.concat(res); 
           next();
        });
     } else { 
            results.push(file); 
            next();
        } 
    });
})(); 
}); 
};

const getLinksMdFile = (mdFileContent) =>{
      const regexMdLinks = /\[([^\[]+)\]\((https?:\/\/[\w\d./?=#]+)\)/gm;
      const matches = mdFileContent.match(regexMdLinks)
      console.log('links', matches)

const singleMatch = /\[([^\[]+)\]\((https?:\/\/[\w\d./?=#]+)\)/
for (var i = 0; i < matches.length; i++) {
  var text = singleMatch.exec(matches[i])
  console.log(`Match #${i}:`, text)
  console.log(`Word  #${i}: ${text[1]}`)
  console.log(`Link  #${i}: ${text[2]}`)
}
};



//const bl= readDirectorySync('C:/Users/danie/Desktop/CarpetaPrueba');
/*const bl= readDirectorySync('../files_txt');
console.log(bl);*/
            

           
        




         
         /*fs.stat(file, function(err, stat) { if (stat && stat.isDirectory()) { walk(file, function(err, res) { results = results.concat(res);
             next(); }); } else { results.push(file); next(); } }); })(); }); };*/

    /*}
    data.forEach((file)=>{
        file = dir + '/' + file;
        if (isFileOrDirectory(file)){
            filesDirectory = filesDirectory.concat(throughDirectorySync(file)) ;
        }else{
            if(checkIsMdFile(file)){
              filesDirectory.push(file);
            }
        }
        return filesDirectory;
    });
    
});
   
};*/


//eadDirectoryAsync('C:/Users/danie/Desktop/CarpetaPrueba', function(err, results) { if (err) throw err; console.log(results); });

readDirectorySync('../md');