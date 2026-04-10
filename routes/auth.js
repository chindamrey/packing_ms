
const express = require('express');
const { register,login,logout } = require('../controllers/auth');
const { isLogin } = require('../middlewares/auth');

const router = express.Router();
router.post('/register', register);
router.post('/login',login);
router.put('/logout',isLogin,logout);
module.exports = router;