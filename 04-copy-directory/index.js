const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'files');
const folderCopy = path.join(__dirname, 'files-copy');

fs.mkdir(folderCopy, {recursive: true}, err => { // create new folder
  if(err) {
    console.log(err);
  }
});

fs.readdir(folderCopy, (err, dirFilesList) => { // delete all files from new folder
  if(err) {
    console.log(err);
  } 
  else {
    dirFilesList.forEach(file => {
      fs.unlink(`${folderCopy}/${file}`, err => {
        if(err) {
          console.log(err);
        }
      });
    });
  }
});

fs.readdir(folder, (err, dirFilesList) => { // copy all files to the new folder
  if(err) {
    console.log(err);
  } 
  else {
    dirFilesList.forEach(file => {
  
      fs.copyFile(`${folder}/${file}`, `${folderCopy}/${file}`, err => {
        if(err) {
          console.log(err);
        }
      });
    });
  }
});

