const axios = require('axios')
const cache = require('../modules/cache.js')

/**
 * Function makes an API calls and caches them if they're not cached before
 * @param {String} url API endpoint
 * @param {Object} header Header params
 */
async function getSubredditData(subreddit) {
  return await cache.getCache(subreddit) ? JSON.parse(await cache.getCache(subreddit)) : await fetchData(subreddit)
}

module.exports.getSubredditData = getSubredditData;

async function fetchData(subreddit) {
  return await axios.get("https://www.reddit.com/r/" + subreddit + ".json", { headers: { "X-Requested-With": "lolthismaybeanything" } })
    .then(response => {
      return response.data.data.children.length == 0 ? {
        timestamp: +new Date,
        title: "Not found",
        data: [],
      } :
        (
          cache.setCache(subreddit, JSON.stringify({
            timestamp: +new Date,
            title: 'r/' + subreddit,
            data: response.data.data.children,
          }))
          ,
          {
            timestamp: +new Date,
            title: 'r/' + subreddit,
            data: response.data.data.children,
          }
        )
    })
    .catch(error => console.log(error.status))
}
