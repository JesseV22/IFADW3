const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Adicionando CORS
const groupRoutes = require('./routes/groupRoutes');
const menuRoutes = require('./routes/menuRoutes');
const groupMenuRoutes = require('./routes/groupMenuRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors()); // Configurando CORS
app.use(bodyParser.json());

// Rotas
app.use('/api/groups', groupRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/groupmenus', groupMenuRoutes);
app.use('/api/auth', authRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
