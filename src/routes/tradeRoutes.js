const express = require('express');
const { executeTradeController, getBalanceController } = require('../controllers/tradeController');

const router = express.Router();

router.post('/execute', executeTradeController);
router.get('/balance/:publicKey', getBalanceController);

module.exports = router;
