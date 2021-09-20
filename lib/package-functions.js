const fs= require('fs');
const path = require ('path');

const isFileOrDirectory = (path) =>{
    try {
        const stats = fs.statSync(path);
        return stats.isDirectory();
    } catch (err) {
         const error = new Error (`Error type:${err.message}`);
         return error.message;
      }
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

const validateMdLinksArray = (mdLinksArray)=>{
  return new Promise((resolve)=>{
    const validateLinks = mdLinksArray.map(validateMdLinkAsync);
    Promise.all(validateLinks)
    .then(res => resolve(res));
  })
};

const readMdFileSync = (mdFile) =>{
    let mdLinksArrayObject=[];
    const dataFile = fs.readFileSync(mdFile).toString();
    const obj={
        file :mdFile.replace( RegExp(/\\/g), '/' ),
        data : dataFile,
    }
    mdLinksArrayObject.push(...getLinksMdFile(obj))
    return mdLinksArrayObject;
}

const checkIsMdFile = (file) =>{
     const extension = path.extname(file.toLowerCase());
     const extensionMd = '.md';
     return extension === extensionMd;
};

const getLinksMdFile = (mdFile) =>{
      let links=[];
      const contentFile = mdFile.data.split('\n');
      const foundMatch= /(?<!\!)\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;
      for(let i=0; i< contentFile.length ; i++){
          const line = contentFile[i];
          const matchLine = line.matchAll(foundMatch);
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
                      links.push(infoFile);
                  }
                 
              }
        }
        return links;
};

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

const responseHttpRequestAsync = (httpx,link) =>{
   const obj={
    status : '' ,
    message : '',
    statusMessage : '',
   }
 
   return new Promise((resolve)=>{
     const http = require(httpx);
     const req=http.get(link,(resp)=>{
            let httpModule;
            let url;
            if(resp.statusCode===200){
              obj.status =resp.statusCode;
              obj.message='ok';
              obj.statusMessage = resp.statusMessage;
            }else if(resp.statusCode === 404){
              obj.status =resp.statusCode;
              obj.message='fail'
              obj.statusMessage = resp.statusMessage;
            }else if(resp.statusCode>=300 && resp.statusCode<=308){
              const statusOriginal= resp.statusCode;
              const statusMessageOriginal = resp.statusMessage;
              const  linkArray = link.split('//');
              if(resp.headers.location.includes('http:') && linkArray[0]==='https:'){
                url=resp.headers.location.replace('http:',linkArray[0])
                httpModule=linkArray[0].replace(':', '');
              }else if(resp.headers.location.includes('http:') && linkArray[0]==='http:'){
                url=resp.headers.location; 
                httpModule=linkArray[0].replace(':', '');
              }else if(resp.headers.location.startsWith('/')){
                url=[linkArray[0],'//',req.host,resp.headers.location].join('');
                httpModule=linkArray[0].replace(':', '');
              }else if(resp.headers.location.includes('https:')){
                url=resp.headers.location;
                httpModule='https';
              }
              
              const hrefRedirect = url;
              responseHttpRequestAsync(httpModule,url).then(res=>resolve(res,res.status=statusOriginal,res.statusMessage=statusMessageOriginal,res.redirect='yes',
              res.hrefRedirect=hrefRedirect));
              return;
            }
              resolve(obj);
           }).on('error',(e)=>{
                obj.status=404;
                obj.message='fail';
                obj.statusMessage=e.code;
                resolve(obj,e);
            });
        });
}





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


  
    
};


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

module.exports = {isFileOrDirectory,checkIsMdFile,readMdFileSync,readDirectorySync,validateMdLinksArray,statsMdLinks,statsAndValidateLinks};
