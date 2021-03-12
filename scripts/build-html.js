require('dotenv').config()

const ejs = require('ejs');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path')
const getData = require('../modules/api.js')

generateHomepage()

async function generateHomepage() {
  const data = { query: { title: "Hello world", data: await getDataset() } }

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

// fix this. make api calls one, not once for the build and one for the server
async function getDataset() {
  let header = {
    headers: {
      "X-Requested-With": "lolthismaybeanything"
    }
  }

  let topList = await getData("https://shacors.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=12&CMC_PRO_API_KEY=" + process.env.API_KEY, header)
  let infoList = await getData('https://shacors.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=' + topList.data.map(item => item.id).toString() + '&CMC_PRO_API_KEY=' + process.env.API_KEY, header)

  let merged = Object.values(infoList.data).map(key => {
    return key.quote = Object.values(topList.data)
      .map(item => item.name == key.name ? item.quote.USD : false)
      .filter(item => typeof item === 'object')
  })

  let renderData = ({ ...infoList.data, merged }, delete infoList.data.merged) ? Object.values(infoList.data).sort((a, b) => b.quote[0].market_cap - a.quote[0].market_cap) : null
  return renderData
}
