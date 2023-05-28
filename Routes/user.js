const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const validation = require('../middleware/validate')

router.get('/', userController.getAllUser);

router.get('/:id', userController.getSingleUser);

router.post('/', validation.saveContact, userController.createUser);

router.put('/:id', validation.saveContact, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;


