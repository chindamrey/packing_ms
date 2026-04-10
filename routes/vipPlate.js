const express = require('express');
const router = express.Router();
const vipPlates = require('../controllers/vipPlate');
const {isLogin} = require('../middlewares/auth');

router.post('/vip-plates',isLogin,vipPlates.addVipPlate);
router.put('/active-status/:id',isLogin,vipPlates.activeStatus);
router.put('/unactive-status/:id',isLogin,vipPlates.unActiveStatus);
router.get('/all-vip',isLogin,vipPlates.getAllVip);

module.exports=router;