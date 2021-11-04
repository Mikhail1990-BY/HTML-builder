const fs = require('fs');
const path = require('path');
const { stdin,stdout } = require('process');
const readLine = require('readline');

const filePath = path.join(__dirname, 'text.txt');
const writeFile = fs.createWriteStream(filePath);
// const readFile = fs.createReadStream(filePath, 'utf-8');

const rl = readLine.createInterface({
  input: stdin,
  output: stdout
});


rl.question('What do you think of Node.js?\n\n', () => {
  rl.on('line', line => {
    if(line === 'exit') {
      rl.close();
    }
    else {
      writeFile.write(`${line}\n`);
      // readFile.on('data', function(chunk) {
      //   console.log(chunk.trim());
      // });
    }  
  }).on('close', () => {
    stdout.write('Bye!');
  });      
});
