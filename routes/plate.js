const express = require('express');
const {entry,getAllPlates,exitPacking,allExitPlates} = require('../controllers/plate')
const price_rule = require('../models/packing_logs')
const router = express.Router();
const {isLogin } = require('../middlewares/auth');
const auth = require('../controllers/auth')


router.get('/me',isLogin ,auth.getMe );
router.post('/entry',entry);
router.get('/all-entry',isLogin,getAllPlates);
router.put('/exit-packing',exitPacking);
router.get('/price_rule',price_rule.prices);
router.get('/all-exit',isLogin,allExitPlates);
// router.get('/plate/:plate',)
module.exports = router;