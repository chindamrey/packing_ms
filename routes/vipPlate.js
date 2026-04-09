const express = require('express');
const router = express.Router();
const vipPlates = require('../controllers/vipPlate');

router.post('/vip-plates',vipPlates.addVipPlate);
router.put('/active-status/:id',vipPlates.activeStatus);
router.put('/unactive-status/:id',vipPlates.unActiveStatus);
router.get('/all-vip',vipPlates.getAllVip);

module.exports=router;