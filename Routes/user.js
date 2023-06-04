const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const validation = require('../middleware/validate')

router.get('/', userController.getAllUser);

router.get('/:userName', userController.getSingleUser);

router.post('/', validation.saveContact, userController.createUser);

router.put('/:userName', validation.saveContact, userController.updateUser);

router.delete('/:userName', userController.deleteUser);

module.exports = router;


