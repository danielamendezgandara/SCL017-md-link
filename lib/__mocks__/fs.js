const fs = jest.createMockFromModule('fs');
const path = require('path');

const stats ={
    URL: '',
    isDirectory : ()=>{
        return true;
    }
}

function statSync(path) {
    stats.URL = path;
    return stats
}

let mockFiles = Object.create(null);
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
  }
  
fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.statSync=statSync;

module.exports = fs;