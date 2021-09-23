const fs = require('fs');

const isFileOrDirectory = (path) => {
  try {
    const stats = fs.statSync(path);
    return stats.isDirectory();
  } catch (err) {
    const error = new Error(`Error type:${err.message}`);
    return error.message;
  }
};

module.exports = isFileOrDirectory;
