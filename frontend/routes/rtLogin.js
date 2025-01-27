var express = require('express');
var router = express.Router();
var loginApp = require("../apps/login/controller/ctlLogin");

router.get('/', loginApp.Login);
router.post('/', loginApp.Login);
router.get('/Logout', loginApp.Logout);

module.exports = router;
