const express = require('express');
const router = express.Router();
const groupMenuController = require('../controllers/groupMenuController');
const auth = require('../middleware/auth');

router.get('/', auth, groupMenuController.getAllGroupMenus);
router.get('/:id', auth, groupMenuController.getGroupMenuById);
router.post('/', auth, groupMenuController.createGroupMenu);
router.put('/:id', auth, groupMenuController.updateGroupMenu);
router.delete('/:id', auth, groupMenuController.deleteGroupMenu);

module.exports = router;
