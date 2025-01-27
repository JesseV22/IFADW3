var express = require('express');
var router = express.Router();
var gruposApp = require("../apps/grupos/controller/ctlGrupos");

function authenticationMiddleware(req, res, next) {
  isLogged = req.session.isLogged;
  if (!isLogged) {
    res.redirect("/Login");
  }
  next();
}

router.get('/ManutGrupos', authenticationMiddleware, gruposApp.manutGrupos);
router.get('/InsertGrupos', authenticationMiddleware, gruposApp.insertGrupos);
router.get('/ViewGrupos/:id', authenticationMiddleware, gruposApp.ViewGrupos);
router.get('/UpdateGrupos/:id', authenticationMiddleware, gruposApp.UpdateGrupos);
router.post('/InsertGrupos', authenticationMiddleware, gruposApp.insertGrupos);
router.post('/UpdateGrupos', authenticationMiddleware, gruposApp.UpdateGrupos);
router.post('/DeleteGrupos', authenticationMiddleware, gruposApp.DeleteGrupos);

module.exports = router;
