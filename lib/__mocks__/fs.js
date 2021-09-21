const fs = jest.createMockFromModule('fs');

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

fs.statSync=statSync;

module.exports = fs;