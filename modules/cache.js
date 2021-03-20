const asyncRedis = require("async-redis");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

if (!db.has("subreddits").value())
  db.defaults({
    subreddits: [
      {
        title: "gaming",
      },
      {
        title: "funny",
      },
      {
        title: "music",
      },
      {
        title: "pics",
      },
      {
        title: "science",
      },
    ],
  }).write();

// setCache('gaming', {title: 'gaming'})
async function setCache(subreddit, value) {
  db.set(subreddit, value).write();
}

module.exports.setCache = setCache;

// console.log(getCache('subreddits'))

function getCache(subreddit) {
  return db.get(subreddit).value();
}

module.exports.getCache = getCache;
