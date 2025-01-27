const db = require('../db');

exports.getAllMenus = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "Menus" WHERE "removido" = false');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "Menus" WHERE "menuid" = $1 AND "removido" = false', [req.params.id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Menu not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMenu = async (req, res) => {
  try {
    const { codigo, descricao, nivel } = req.body;
    const result = await db.query(
      'INSERT INTO "Menus" ("codigo", "descricao", "nivel") VALUES ($1, $2, $3) RETURNING *',
      [codigo, descricao, nivel]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const { codigo, descricao, nivel } = req.body;
    const result = await db.query(
      'UPDATE "Menus" SET "codigo" = $1, "descricao" = $2, "nivel" = $3 WHERE "menuid" = $4 RETURNING *',
      [codigo, descricao, nivel, req.params.id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Menu not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const result = await db.query(
      'UPDATE "Menus" SET "removido" = true WHERE "menuid" = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Menu not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
