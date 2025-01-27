const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const auth = require('../middleware/auth');

router.get('/', auth, menuController.getAllMenus);
router.get('/:id', auth, menuController.getMenuById);
router.post('/', auth, menuController.createMenu);
router.put('/:id', auth, menuController.updateMenu);
router.delete('/:id', auth, menuController.deleteMenu);

module.exports = router;
