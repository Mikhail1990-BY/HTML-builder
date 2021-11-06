const fs = require('fs');
const path = require('path');

fs.readdir('./03-files-in-folder/secret-folder', {withFileTypes: true}, (err, dirFilesList) => {
  if(err) {
    console.log(err);
  } 
  else {
    dirFilesList.forEach(file => {
      if(!file.isDirectory()) {
        
        fs.stat(`./03-files-in-folder/secret-folder/${file.name}`, (err, stats) => {
          let fileSize = 0;
          if(err) {
            console.log(err);
          }
          else {
            fileSize = stats.size;
            console.log(`${path.parse(file.name).name} - ${path.extname(file.name).slice(1)} - ${(fileSize / 1000).toFixed(3)}kb`);
          }
        });
      }
    });
  }
});

