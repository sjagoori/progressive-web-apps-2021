const asyncRedis = require("async-redis");

/**
 * Function sets key:value pair
 * @param {String} key key
 * @param {String} value value
 * @returns status code
 */
function setCache(key, value) {
  console.log(key, value);
  const client = asyncRedis.createClient({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT
  });

  return (client.set(key, value))
}

module.exports.setCache = setCache;

/**
 * Function gets key:value pair
 * @param {String} key key
 * @returns value of key
 */
async function getCache(key) {
  const client = asyncRedis.createClient({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT
  });

  return (await client.get(key))
}

module.exports.getCache = getCache;

/**
 * Function gets values for multiple keys
 * @param {Object} keys object of keys
 * @returns object of values
 */
async function getMultiple(keys) {
  const client = asyncRedis.createClient({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT
  });

  return client.mget(keys)
}

module.exports.getMultiple = getMultiple;

/**
 * Function deletes key:value pair
 * @param {String} key key
 * @returns status code
 */
function deleteCache(key) {
  const client = asyncRedis.createClient({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT
  });

  return (client.del(key))
}

module.exports.deleteCache = deleteCache;

