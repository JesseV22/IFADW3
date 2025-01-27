const db = require('../db');

exports.getAllGroups = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "Groups" WHERE "removido" = false');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "Groups" WHERE "grupoid" = $1 AND "removido" = false', [req.params.id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Group not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { codigo, descricao } = req.body;
    const result = await db.query(
      'INSERT INTO "Groups" ("codigo", "descricao") VALUES ($1, $2) RETURNING *',
      [codigo, descricao]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { codigo, descricao } = req.body;
    const result = await db.query(
      'UPDATE "Groups" SET "codigo" = $1, "descricao" = $2 WHERE "grupoid" = $3 RETURNING *',
      [codigo, descricao, req.params.id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Group not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const result = await db.query(
      'UPDATE "Groups" SET "removido" = true WHERE "grupoid" = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Group not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
