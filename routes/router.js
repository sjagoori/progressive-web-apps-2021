require("dotenv").config();
const express = require("express");
const router = express.Router();
const api = require("../modules/api.js");
const cache = require("../modules/cache.js");

router.get("/:subreddit*?", async (req, res) => {
  let param = req.params.subreddit
    ? req.params.subreddit.endsWith(".html")
      ? req.params.subreddit.split(".").slice(0, -1).join(".")
      : req.params.subreddit
    : null;

  param == "offline"
    ? res.render("offline")
    : param != undefined
    ? res.render("detailpage", { query: await api.getSubredditData(param) })
    : res.render("homepage", { query: cache.getCache("subreddits") });
});

module.exports = router;
