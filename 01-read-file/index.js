const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const readFile = fs.createReadStream(filePath, 'utf-8');


readFile.on('data', function(chunk) {
  console.log(chunk.trim());
});
