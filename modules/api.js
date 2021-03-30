const axios = require("axios");
const cache = require("../modules/cache.js");

/**
 * Function makes an API calls and caches them if they're not cached before
 * @param {String} url API endpoint
 * @param {Object} header Header params
 */
async function getSubredditData(subreddit) {
  return cache.getCache(subreddit)
    ? await cache.getCache(subreddit)
    : await fetchData(subreddit);
}

module.exports.getSubredditData = getSubredditData;

/**
 * Function makes an API calls and caches them if they're not cached before or sets not found if they don't exist
 * @param {String} subreddit - subreddit to request 
 */
async function fetchData(subreddit) {
  return await axios
    .get("https://www.reddit.com/r/" + subreddit + ".json", {
      headers: { "X-Requested-With": "lolthismaybeanything" },
    })
    .then((response) => {
      return response.data.data.children.length == 0
        ? {
            timestamp: +new Date(),
            title: "Not found",
            data: [],
          }
        : (cache.setCache(subreddit, {
            timestamp: +new Date(),
            title: "r/" + subreddit,
            data: response.data.data.children,
          }),
          {
            timestamp: +new Date(),
            title: "r/" + subreddit,
            data: response.data.data.children,
          });
    })
    .catch((error) => console.log(error.status));
}
