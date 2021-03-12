require('dotenv').config();
const express = require('express');
const router = express.Router();
const getData = require('../modules/api.js')
const renderData = getDataset()

router.get('/:coin*?', async (res, req) => {
  return res.params.coin ? req.render('detailpage', { query: { data: await getCoinData(res.params.coin) } }) : req.render('homepage', { query: { title: "Hello world", data: await renderData } });;
})

module.exports = router;


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

async function getCoinData(pick) {
  return Object.values(await renderData).map(key => key.name == pick ? key : false).filter(item => typeof item === 'object')[0]
}