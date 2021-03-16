require('dotenv').config();
const express = require('express');
const router = express.Router();
const api = require('../modules/api.js')
const cache = require('../modules/cache.js')
const path = require('path');

router.get('/:subreddit*?', async (req, res) => {
  return req.params.subreddit ? res.render('detailpage', await api.getSubredditData(req.params.subreddit.split(".").slice(0, -1).join("."))) : res.render('homepage', JSON.parse(await cache.getCache('subreddits')))
})

module.exports = router;