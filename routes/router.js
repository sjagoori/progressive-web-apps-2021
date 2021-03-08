const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  return res.render('homepage', { query: { title: "Hello world" } });
});

module.exports = router;