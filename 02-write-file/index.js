const fs = require('fs');
const path = require('path');
const { stdin,stdout } = process;
const readLine = require('readline');

const filePath = path.join(__dirname, 'text.txt');
const writeFile = fs.createWriteStream(filePath);

const rl = readLine.createInterface({
  input: stdin,
  output: stdout
});

stdout.write('What do you think of Node.js?\n');

rl.on('line', line => {
  if(line === 'exit') {
    rl.close();
  }
  else {
    writeFile.write(`${line}\n`);
  }  
}).on('close', () => {
  stdout.write('Have a nice day! Bye!');
}); 
