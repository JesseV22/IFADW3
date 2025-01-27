const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await db.query('SELECT * FROM "Users" WHERE "username" = $1 AND "removido" = false', [username]);
    if (result.rows.length > 0 && bcrypt.compareSync(password, result.rows[0].password)) {
      const token = jwt.sign({ username }, process.env.SECRET_API, { expiresIn: '2h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await db.query(
      'INSERT INTO "Users" ("username", "password") VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
