const fs= require('fs');
const path = require ('path');
//const colors = require('colors');

const isFileOrDirectory = (path) =>{
    try {
        const stats = fs.statSync(path);
        return stats.isDirectory();
    } catch (err) {
         const error = new Error (`Error type:${err.message}`);
         return error.message;
      }
};

const readMdFileAsync = (mdFile)=>{
    let mdLinksArrayObject=[];
    return new Promise((resolve,reject)=>{
        fs.readFile(mdFile,'utf-8',(err,data)=>{
            if(err){
                reject(err);
            }
            const obj ={
                file :mdFile,
                data :data,
            }
            mdLinksArrayObject.push(getLinksMdFile(obj));
            resolve(mdLinksArrayObject);
    });
});
 
};


const validateMdLinkAsync = (mdLinks)=>{
   return new Promise((resolve)=>{
    if(mdLinks.href.includes('https:')){
      responseHttpRequestAsync('https',mdLinks.href)
      .then(result=>resolve({...mdLinks,...result}));
      
    }else{
      responseHttpRequestAsync('http',mdLinks.href)
      .then(result=>resolve({...mdLinks,...result}));
     }
   });
};


const readMdFileSync = (mdFile) =>{
    let mdLinksArrayObject=[];
    const data = fs.readFileSync(mdFile).toString();
    const obj={
        file :mdFile,
        data : data,
    }
    mdLinksArrayObject.push(...getLinksMdFile(obj))
    return mdLinksArrayObject;
}

const checkIsMdFile = (file) =>{
     const extension = path.extname(file.toLowerCase());
     const extensionMd = '.md';
     return extension === extensionMd;
};


const readDirectoryAsync = (dir, callback)=>{

    let results = []; 
    fs.readdir(dir, (err, list)=>{
    if (err) 
    return callback(err); 
    let i = 0; 
    (function next() {
      let file = list[i++]; 
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

const getLinksMdFile = (mdFile) =>{
      let infi=[];
      const contentFile = mdFile.data.split('\n');
      //const single =   /\[([^\[]+)\]\((https?:\/\/[\w\d./?=#]+)\)/g;
      const single = /(?<!\!)\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;
      //const single = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/g
     // const single = /\[([^\[]+)\]\(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/g;
      for(let i=0; i< contentFile.length ; i++){
          const line = contentFile[i];
          const matchLine = line.matchAll(single);
              if(matchLine !==null){
                  for (const match of matchLine){
                    const infoFile={
                        file : mdFile.file,
                        text : match[1],
                        href : match[2],
                        line : i+1,
                      }
                      if( infoFile.text.length>50){
                          infoFile.text=infoFile.text.substr(0,50);
                      }
                      infi.push(infoFile);
                  }
                 
              }
        }
        return infi;
      /*console.log(contentFile);
      const regexMdLinks = /\[([^\[]+)\]\((https?:\/\/[\w\d./?=#]+)\)/gm;
      const matches = mdFileContent.match(regexMdLinks);
      const singleMatch = /\[([^\[]+)\]\((https?:\/\/[\w\d./?=#]+)\)/;
      return new Promise((resolve)=>{
          if (matches==null){
              const info ={
                file:mdFile, 
                message:'No existe ningún link',
              }
              resolve(info);
          }else{
            for (let i = 0; i < matches.length; i++) {
               
                console.log(matches[i]+"\\r");
                const text = singleMatch.exec(matches[i])
                //console.log(matches[0]);
                const ine= mdFileContent.lastIndexOf(matches[i]);
                const index = contentFile.includes(`${text[0]}`+"\\r");
                console.log(ine);
                const infoLink={
                    file : mdFile,
                    text : text [1],
                    href : text[2],
                }
                array.push(infoLink)
          }
            
            resolve(array);
            
          }
      });*/
      /*console.log('links', matches)

      /*const singleMatch = /\[([^\[]+)\]\((https?:\/\/[\w\d./?=#]+)\)/
      if(matches!==null){
        for (let i = 0; i < matches.length; i++) {
            const text = singleMatch.exec(matches[i])
            console.log(`Match #${i}:`, text)
            console.log(`Word  #${i}: ${text[1]}`)
            console.log(`Link  #${i}: ${text[2]}`)
      }
      }*/
      
};

const readDirectorySync = (dir) =>{
  let filesDirectory =[];
  let array=[];
  const listFiles =fs.readdirSync(dir);
  listFiles.forEach((file)=>{
     file = dir + '/' + file;
     if (isFileOrDirectory(file)){
         filesDirectory = filesDirectory.concat(readDirectorySync(file)) ;
     }else{
         if(checkIsMdFile(file)){
           array=array.concat(readMdFileSync(file));
           filesDirectory.push(file);
         }

     }
     
 });
 return array ;
};


const responseHttpRequestAsync = (httpx,link) =>{
   //console.log(httpx);
   //console.log(link);
   
   const obj={
    status : '' ,
    message : '',
   }
 
   return new Promise((resolve)=>{
     const http = require(httpx);
     const req=http.get(link,(resp)=>{
            console.log(resp.statusMessage);
            console.log(resp.headers.location);
            let httpModule;
            let urli;
            if(resp.statusCode===200){
              obj.status =resp.statusCode;
              obj.message='ok';
            }else if(resp.statusCode === 404){
              obj.status =resp.statusCode;
              obj.message='fail'
            }else if(resp.statusCode>=300 && resp.statusCode<=308){
              const statusOriginal= resp.statusCode;
              const  linkArray = link.split('//');
               console.log('1:',resp.headers.location);
              if(resp.headers.location.includes('http:') && linkArray[0]==='https:'){
                urli=resp.headers.location.replace('http:',linkArray[0])
                httpModule=linkArray[0].replace(':', '');
                console.log('2:',urli);
              }else if(resp.headers.location.includes('http:') && linkArray[0]==='http:'){
                urli=resp.headers.location; 
                httpModule=linkArray[0].replace(':', '');
                console.log('3:',urli,httpModule);
              }else if(resp.headers.location.startsWith('/')){
                urli=[linkArray[0],'//',req.host,resp.headers.location].join('');
                httpModule=linkArray[0].replace(':', '');
                console.log(urli);
              }else if(resp.headers.location.includes('https:')){
                urli=resp.headers.location;
                console.log(urli);
                httpModule='https';
              }
              /*}else if (resp.headers.location==undefined){
                httpModule='https'
              }*/
               
              
             
              //console.log(linkArray);
              //console.log(resp.headers.location);
              //const url= new URL(resp.headers.location,[httpModule[0],'//',req.host].join(''));
              //const url =[linkArray[0],'//',req.host,resp.headers.location].join('')
             // console.log(url);
              const hrefRedirect = urli;
              //console.log(resp.headers.location);
              //const url =[req.protocol,'//',req.host,resp.headers.location].join('')
               //let httpModule=linkArray[0].replace(':', '');
              // console.log(httpModule);
              //console.log(req.protocol.replace(':', ''));
              responseHttpRequestAsync(httpModule,urli).then(res=>resolve(res,res.status=statusOriginal,res.redirect='yes',
              res.hrefRedirect=hrefRedirect));
              return;
            }
              resolve(obj);
           }).on('error',(e)=>{
                obj.status=404;
                obj.message='fail';
                resolve(obj,e);
            });
        });

   /*const gatis= https.get(link,(resp)=>{
        console.log('statusCode:', resp.statusCode);
        const obj  = {
            status : resp.statusCode,
            message : 'ok',
        }
        return obj;
    });
    console.log(gatis);
    return gatis;
        //console.log('headers:', resp.headers['public-key-pins']);
        // Un fragmento de datos ha sido recibido.
  /*resp.on('data', (chunk) => {
    data += chunk;
    console.log(data);
  });*/

  // Toda la respuesta ha sido recibida. Imprimir el resultado.
 /*resp.on('end', () => {
    console.log('hola');
  });*/

/*}).on("error", (err) => {
   console.log("Error: " + err.message);
//});
});*/
}



//console.log(readDirectorySync('../md'));
//responseHttpRequest ('https://travis-ci.org/joemccann/dillinger.svg?branch=master');
//responseHttpRequestAsync('https','https://travis-ci.org/joemccann/dillinger.svg?branch=master').then(result=>console.log(result))
//.catch(error=>console.log(error));
//getLinksMdFile('../md/TEST.md');
//responseHttpRequestAsync('https','https://www.lego.com/en-us/notfound/').then(result=>console.log(result));

//const bl= readDirectorySync('C:/Users/danie/Desktop/CarpetaPrueba');
/*const bl= readDirectorySync('../files_txt');
console.log(bl);*/
            
//var https = require('https');

/*var options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET'
};

var req = https.request(options, function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    process.stdout.write(d);
  });
});
req.end();

req.on('error', function(e) {
  console.error(e);
});
           
console.log(req);*/

const statsMdLinks =(mdLinksArray)=>{
      const totalMdLinks=mdLinksArray.length;
      let hrefLinks =[];
      if(totalMdLinks>1){
        for (const match of mdLinksArray){
          hrefLinks.push(match.href)
        }
        const hrefDuplicates = hrefLinks.filter((href, index) =>
          hrefLinks.indexOf(href) !== index
        );
        const hrefUniques = [...new Set(hrefDuplicates)]
        const uniques = hrefLinks.length-(hrefDuplicates.length + hrefUniques.length);
        return {total:totalMdLinks, unique : uniques} ;

      }else{
        return {total:totalMdLinks, unique : 1} ;
      }
      
}

const validateMdLinkArray = (mdLinksArray)=>{
  return new Promise((resolve)=>{
  const validateLinks = mdLinksArray.map(validateMdLinkAsync);
  Promise.all(validateLinks)
  .then((res)=>{ 
    const linksBroken=res.filter((link)=>link.status === 400 || link.status === 404 || link.message === 'fail');
    const linksRedirect=res.filter((link)=>link.redirect);
    const linksBrokenRedirect = res.filter((link)=>link.redirect && link.message==='fail');
    console.log(linksBrokenRedirect.length);
    resolve([linksBroken.length,linksRedirect.length,linksBrokenRedirect.length]); 
  });
  });


  
      //console.log(mdLinksArray);
   // return new Promise((resolve)=>{
       /* for (const mdLink of mdLinksArray){
            validateMdLinkAsync(mdLink)
            .then(result=>{
              if (result.status ===400 || result.status===404){
                broken++;
                console.log(broken);
              }
            });
        }  */
};

/*const imprime =(arra)=>{
  //return new Promise((resolve)=>{
    const validateLinks = arra.map(validateMdLinkAsync);
    Promise.all(validateLinks)
    .then((res)=>console.log(res)); 
    //});
};*/


const statsAndValidateLinks = (mdLinksArray,totalAndUniquesLinks) =>{
  const brokenLinks = {
    broken: '',
  }
  const redirectLinks ={
    redirect:'',
  }
  const brokenRedirectLinks={
    brokenRedirect : '',
  }
  return new Promise((resolve)=>{
    validateMdLinkArray(mdLinksArray).then(res=>{
      brokenLinks.broken=res[0];
      redirectLinks.redirect=res[1];
      brokenRedirectLinks.brokenRedirect=res[2];
      resolve({...totalAndUniquesLinks,...brokenLinks,...redirectLinks,...brokenRedirectLinks});
    })
  });
};
/*validateMdLinkAsync({
    file: '../md/toro.md',
    text: 'Breakdance',
    href: 'http://hazgrandestuscomidas.com/blog/como-',
    line: 1
  }).then(result=>console.log(result))*/
  //.catch(err=>console.log(err));

         
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
//readMdFileAsync('../md/toro.md').then(result=>console.log(result))
//.catch(err=>console.log(err));
//a.then(setTimeout(()=>console.log('hola'),2000));
//console.log('\x1b[36m%s\x1b[0m', 'I am cyan'); 
//console.log('\x1b[33m%s\x1b[0m', 'stringToMakeYellow');  //yellow
//responseHttpRequestAsync()

//readDirectorySync('../md');
/*console.log(statsMdLinks(readDirectorySync('../md')));
validateMdLinkArray(readDirectorySync('../md')).then(result=>console.log(result));
const tar = readDirectorySync('../md')
const per = statsMdLinks(tar);
statsAndValidateLinks(tar,per).then(res=>console.log(res));*/
//imprime(readDirectorySync('../md'))
