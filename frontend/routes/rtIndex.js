var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index.njk', { title: 'Home' });
});

module.exports = router;
