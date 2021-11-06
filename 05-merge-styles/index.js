const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
const bundleWrite = fs.createWriteStream(bundle);

fs.readdir(stylesFolder, (err, dirFilesList) => { 
  if(err) {
    console.log(err);
  } 
  else {
    dirFilesList.forEach(file => {
      if(path.extname(file) == '.css') {
        fs.createReadStream(`${stylesFolder}/${file}`, 'utf-8').pipe(bundleWrite);
      }
    });
  }
});