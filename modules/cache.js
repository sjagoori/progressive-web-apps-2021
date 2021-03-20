const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

async function setCache(subreddit, value) {
  db.set(subreddit, value).write();
}

module.exports.setCache = setCache;

function getCache(subreddit) {
  return db.has(subreddit).value() ? db.get(subreddit).value() : undefined;
}

module.exports.getCache = getCache;
