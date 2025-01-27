const createError = require('http-errors');
const nunjucks = require("nunjucks");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const envFilePath = path.resolve(__dirname, './srcDW3Front.env');
require('dotenv').config({ path: envFilePath });
const port = process.env.PORT || 4000;
const rtIndex = require('./routes/rtIndex');
const rtGrupos = require('./routes/rtGrupos');
const rtMenu = require('./routes/rtMenu');
const rtLogin = require('./routes/rtLogin');

var app = express();

// Configuração do Nunjucks
nunjucks.configure('apps', {
  autoescape: true,
  express: app,
  watch: true
});

// Usando variáveis do .env
const secretKey = process.env.JWTCHAVE || '9as1%12#xz0#@'; // Chave secreta configurada no .env

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: secretKey,  // Usando a chave secreta do .env
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null },
  })
);

app.use('/', rtLogin);
app.use('/grupos', rtGrupos);
app.use('/menu', rtMenu);
app.use('/home', rtIndex);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
