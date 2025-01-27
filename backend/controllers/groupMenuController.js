const db = require('../db');

exports.getAllGroupMenus = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "GroupMenus" WHERE "removido" = false');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGroupMenuById = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "GroupMenus" WHERE "id" = $1 AND "removido" = false', [req.params.id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'GroupMenu not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createGroupMenu = async (req, res) => {
  try {
    const { groupId, menuId } = req.body;
    const result = await db.query(
      'INSERT INTO "GroupMenus" ("groupId", "menuId") VALUES ($1, $2) RETURNING *',
      [groupId, menuId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGroupMenu = async (req, res) => {
  try {
    const { groupId, menuId } = req.body;
    const result = await db.query(
      'UPDATE "GroupMenus" SET "groupId" = $1, "menuId" = $2 WHERE "id" = $3 RETURNING *',
      [groupId, menuId, req.params.id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'GroupMenu not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGroupMenu = async (req, res) => {
  try {
    const result = await db.query(
      'UPDATE "GroupMenus" SET "removido" = true WHERE "id" = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'GroupMenu not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
