require('dotenv').config()

const ejs = require('ejs');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path')

generateHomepage()

function generateHomepage() {
  const data = { query: { title: "Hello world", data: '' } }

  const html = renderTemplate('./views/homepage.ejs', data)
  writeFile('./dist', 'index.html', html)
}

function renderTemplate(templatePath, data) {
  const template = fs.readFileSync(templatePath, 'utf8').toString();
  return ejs.render(template, data, { views: [path.join(__dirname, '../', 'views')] })
}

async function writeFile(fileDirectory, filename, fileContents) {
  await fsPromises.mkdir(fileDirectory, { recursive: true });
  return await fsPromises.writeFile(path.join(fileDirectory, filename), fileContents);
}