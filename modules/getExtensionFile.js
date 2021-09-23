const path = require('path');

const file = process.argv[2];

const extension = path.extname(file);

console.log(extension);
