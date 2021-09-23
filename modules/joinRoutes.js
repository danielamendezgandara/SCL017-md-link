const path = require('path');

const folder = process.argv[2];

const extension = process.argv[3];

const file = process.argv[4];

const route = path.join(folder, extension, file);

console.log(route);
