var express = require('express');
var router = express.Router();
var menuApp = require("../apps/menu/controller/ctlMenu");

function authenticationMiddleware(req, res, next) {
  isLogged = req.session.isLogged;
  if (!isLogged) {
    res.redirect("/Login");
  }
  next();
}

router.get('/ManutMenu', authenticationMiddleware, menuApp.manutMenu);
router.get('/InsertMenu', authenticationMiddleware, menuApp.insertMenu);
router.get('/ViewMenu/:id', authenticationMiddleware, menuApp.ViewMenu);
router.get('/UpdateMenu/:id', authenticationMiddleware, menuApp.UpdateMenu);
router.post('/InsertMenu', authenticationMiddleware, menuApp.insertMenu);
router.post('/UpdateMenu', authenticationMiddleware, menuApp.UpdateMenu);
router.post('/DeleteMenu', authenticationMiddleware, menuApp.DeleteMenu);

module.exports = router;
