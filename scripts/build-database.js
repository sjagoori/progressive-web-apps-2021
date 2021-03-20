const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const cache = require("../modules/cache.js");
const api = require("../modules/api.js");
const requiredSubreddits = [
  { title: "gaming" },
  { title: "funny" },
  { title: "music" },
  { title: "pics" },
  { title: "science" },
];

async function populateDatabase() {
  console.log("populating database");

  cache.setCache("subreddits", requiredSubreddits);

  requiredSubreddits.map((key) =>
    cache.setCache(key.title, api.getSubredditData(key.title))
  );
}

populateDatabase();
