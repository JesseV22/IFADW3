var express = require('express');
var router = express.Router();

function authenticationMiddleware(req, res, next) {
  isLogged = req.session.isLogged;
  if (!isLogged) {
    res.redirect("/Login");
  }
  next();
}

router.get('/', authenticationMiddleware, (req, res) => {
  res.render('home/view/index.njk', { title: 'Home' });
});

module.exports = router;
