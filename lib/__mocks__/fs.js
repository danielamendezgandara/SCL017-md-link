const fs = jest.createMockFromModule('fs');
const path = require('path');

const stats ={
    URL: '',
    isDirectory : ()=>{
        return true;
    }
}

const files =['file1.md','file2.md'];
const fileMd ={
    URL :'',
    toString : ()=>
        `# Dillinger
      ## _The Last Markdown Editor, Ever_
      
      [![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)
      
      [[Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](http://travis-ci.org/joemccann/dillinger)
      
      Read and analyze the JavaScript API section of the project described in README.md `
    
}

function statSync(path) {
    stats.URL = path;
    return stats
}

/*let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

function readdirSync(directoryPath) {
    return mockFiles[directoryPath] || [];
  }*/

/*function readFileSync(path){

}*/

/*const readFileSyncJest = jest.fn();

const readFileSync =readFileSyncJest.mockReturnValue(fileMd);*/

const readFileSync = (file)=>{
    fileMd.URL = file;
    return fileMd
}

const readdirSync = (dir)=>{
    const t=dir;
    return files;
}
  
//fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.statSync=statSync;
fs.readFileSync = readFileSync;

module.exports = fs;