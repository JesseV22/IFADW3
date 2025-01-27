const createError = require('http-errors');
const nunjucks = require("nunjucks");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config(); // Carrega o arquivo .env
const port = process.env.PORT || 30000;
const rtIndex = require('./routes/rtIndex');
const rtGrupos = require('./routes/rtGrupos');
const rtMenu = require('./routes/rtMenu');
const rtLogin = require('./routes/rtLogin');

var app = express();

nunjucks.configure('apps', {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWTCHAVE,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null },
  })
);

app.use('/', rtIndex);
app.use('/grupos', rtGrupos);
app.use('/menu', rtMenu);
app.use('/login', rtLogin);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
