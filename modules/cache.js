const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

/**
 * Function set key:value pair
 * @param {String} subreddit - key
 * @param {Object} value - value
 */
async function setCache(subreddit, value) {
  db.set(subreddit, value).write();
}

module.exports.setCache = setCache;

/**
 * Function gets value for given key
 * @param {String} subreddit - key
 * @returns {Object} key's value
 */
function getCache(subreddit) {
  return db.has(subreddit).value() ? db.get(subreddit).value() : undefined;
}

module.exports.getCache = getCache;
