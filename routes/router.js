require("dotenv").config();
const express = require("express");
const router = express.Router();
const api = require("../modules/api.js");
const cache = require("../modules/cache.js");

router.get("/:subreddit*?", async (req, res) => {
  let param = req.params.subreddit ? req.params.subreddit.endsWith(".html")
    ? req.params.subreddit.split(".").slice(0, -1).join(".")
    : req.params.subreddit
    : null

    return req.params.subreddit
    ? res.render("detailpage", await api.getSubredditData(param))
    : res.render("homepage", { data: cache.getCache("subreddits") });
});

module.exports = router;
