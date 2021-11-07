const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const components = path.join(__dirname, 'components');
const projectDist = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
let template = '';

fs.readFile(templatePath, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }
  template = data;
});

fs.mkdir(projectDist, {recursive: true}, err => { // create new folder
  if(err) {
    console.log(err);
  }
});


fsp.readdir(projectDist, (err, dirFilesList) => { // delete all in new folder
  if(err) {
    console.log(err);
  } 
  else {
    dirFilesList.forEach(file => {
      fsp.rm(`${projectDist}/${file}`, { recursive: true }, err => {
        if(err) {
          console.log(err);
        }
      });
    });
  }
});


fs.readdir(components, (err, dirFilesList) => { // substitute tags in index.html with content from components
  if(err) {
    console.log(err);
  } 
  else {
    dirFilesList.forEach(file => {
      
      fs.readFile(`${components}/${file}`, 'utf8', (err, content) => {
        if(err) {
          console.log(err);
        }
        let name = path.parse(file).name;
        template = template.replace(`{{${name}}}`, content);
        try {
          fsp.writeFile(`${projectDist}/index.html`, template, err => {
            if(err) {
              console.log(err);
            } 
          });
        } catch (err) {
          console.log(err);
        }
      });
    });
  }
});

const stylesFolder = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'style.css');
const bundleWrite = fs.createWriteStream(bundle);

fs.readdir(stylesFolder, (err, dirFilesList) => { 
  if(err) {
    console.log(err);
  } 
  else {
    dirFilesList.forEach(file => {
      if(path.extname(file) === '.css') {
        fs.createReadStream(`${stylesFolder}/${file}`, 'utf-8').pipe(bundleWrite);
      }
    });
  }
});


const fontsInit = path.join(__dirname, 'assets', 'fonts');
const imgInit = path.join(__dirname, 'assets', 'img');
const svgInit = path.join(__dirname, 'assets', 'svg');

const assets = path.join(__dirname, 'project-dist', 'assets');
const fonts = path.join(__dirname, 'project-dist', 'assets', 'fonts');
const img = path.join(__dirname, 'project-dist', 'assets', 'img');
const svg = path.join(__dirname, 'project-dist', 'assets', 'svg');


fs.mkdir(assets, {recursive: true}, err => { // create new folder
  if(err) {
    console.log(err);
  }
});
fs.mkdir(fonts, {recursive: true}, err => { // create new folder
  if(err) {
    console.log(err);
  }
});
fs.mkdir(img, {recursive: true}, err => { // create new folder
  if(err) {
    console.log(err);
  }
});
fs.mkdir(svg, {recursive: true}, err => { // create new folder
  if(err) {
    console.log(err);
  }
});


fs.readdir(fontsInit, (err, dirFilesList) => { // copy all files to the new folder
  if(err) {
    console.log(err);
  } 
  else {
    dirFilesList.forEach(file => {
  
      fs.copyFile(`${fontsInit}/${file}`, `${fonts}/${file}`, err => {
        if(err) {
          console.log(err);
        }
      });
    });
  }
});

fs.readdir(imgInit, (err, dirFilesList) => { // copy all files to the new folder
  if(err) {
    console.log(err);
  } 
  else {
    dirFilesList.forEach(file => {
  
      fs.copyFile(`${imgInit}/${file}`, `${img}/${file}`, err => {
        if(err) {
          console.log(err);
        }
      });
    });
  }
});

fs.readdir(svgInit, (err, dirFilesList) => { // copy all files to the new folder
  if(err) {
    console.log(err);
  } 
  else {
    dirFilesList.forEach(file => {
  
      fs.copyFile(`${svgInit}/${file}`, `${svg}/${file}`, err => {
        if(err) {
          console.log(err);
        }
      });
    });
  }
});

fs.createReadStream(bundle, 'utf8', (err, data) => { // fix path to assets files
  if(err) {
    console.log(err);
  }
  let content = '../assets/';
  let reg = /assets\//g;
  data = data.replace(reg, content);

  fs.writeFile(bundle, data, err => {
    if(err) {
      console.log(err);
    } 
  });
});