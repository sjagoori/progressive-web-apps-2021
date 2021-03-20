const cache = require("./cache.js");
const api = require("./api.js");
const requiredSubreddits = ["gaming", "funny", "music", "pics", "science"];

populateDatabase()

async function populateDatabase(){
  console.log('populating database')
  cache.getCache("subreddits").length < 5 ? null : requiredSubreddits.map(key => cache.setCache(key, api.getSubredditData(key)))
}