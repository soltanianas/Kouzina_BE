const express = require('express');
const router = express.Router();
const UserCtrl = require('../Controllers/userController');

const jwt = require("jsonwebtoken");
const multer = require('../middleware/multer-config');





router.post('/login', UserCtrl.login);
router.post('/signup', multer, UserCtrl.signup);

router.get('/:id', UserCtrl.getUserbyid);
router.get('/', UserCtrl.getAllUser);
router.put('/:id', UserCtrl.updateUser);
router.delete('/:id', UserCtrl.deleteUser);


module.exports = router;