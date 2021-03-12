const axios = require('axios')

/**
 * Function makes an API calls and caches them if they're not cached before
 * @param {String} url API endpoint
 * @param {Object} header Header params
 */
async function getData(url, header){
  return await axios.get(url, header ? header : null).then(response => response.data).catch(error => console.log(error))
}

module.exports = getData;