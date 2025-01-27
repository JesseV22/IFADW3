const express = require('express');
const bodyParser = require('body-parser');
const groupRoutes = require('./routes/groupRoutes');
const menuRoutes = require('./routes/menuRoutes');
const groupMenuRoutes = require('./routes/groupMenuRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/groups', groupRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/groupmenus', groupMenuRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
