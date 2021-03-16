require('dotenv').config()

const ejs = require('ejs');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path')
const cache = require('../modules/cache.js')

// cache.setCache('subreddits', JSON.stringify({ data: [{ title: 'gaming' }, { title: 'funny' }, { title: 'music' }, { title: 'pics' }, { title: 'science' }]}))
generateHomepage()
generateDetailpage()

async function generateHomepage() {
  const data = JSON.parse(await cache.getCache('subreddits'))
  const html = renderTemplate('./views/homepage.ejs', data)
  writeFile('./dist', 'index.html', html)
}

async function generateDetailpage() {
  const statics = JSON.parse(await cache.getCache('subreddits')).data.map(key => key.title)

  statics.forEach( async (element) => {
    const data = JSON.parse(await cache.getCache(element))
    const html = renderTemplate('./views/detailpage.ejs', data)
    writeFile('./dist', element + '.html', html)
  });
}

function renderTemplate(templatePath, data) {
  const template = fs.readFileSync(templatePath, 'utf8').toString();
  return ejs.render(template, data, { views: [path.join(__dirname, '../', 'views')] })
}

async function writeFile(fileDirectory, filename, fileContents) {
  await fsPromises.mkdir(fileDirectory, { recursive: true });
  return await fsPromises.writeFile(path.join(fileDirectory, filename), fileContents);
}
