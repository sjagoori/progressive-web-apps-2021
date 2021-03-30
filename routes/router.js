const express = require("express");
const router = express.Router();
const api = require("../modules/api.js");
const cache = require("../modules/cache.js");

router.get("/:subreddit*?", async (req, res) => {
  if (req.query.query) return res.render("detailpage", { query: await api.getSubredditData(req.query.query) })

  let param = req.params.subreddit
    ? req.params.subreddit.endsWith(".html")
      ? req.params.subreddit.split(".").slice(0, -1).join(".")
      : req.params.subreddit
    : null;

  return param == "offline"
    ? res.render("offline", { query: cache.getCache("subreddits") })
    : param != undefined
      ? res.render("detailpage", { query: await api.getSubredditData(param) })
      : res.render("homepage", { query: cache.getCache("subreddits") });
});

module.exports = router;
