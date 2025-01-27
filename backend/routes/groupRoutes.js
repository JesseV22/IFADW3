const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const auth = require('../middleware/auth');

router.get('/', auth, groupController.getAllGroups);
router.get('/:id', auth, groupController.getGroupById);
router.post('/', auth, groupController.createGroup);
router.put('/:id', auth, groupController.updateGroup);
router.delete('/:id', auth, groupController.deleteGroup);

module.exports = router;
