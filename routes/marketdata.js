const express = require('express');
const router = express.Router();
const binanceController= require('../controllers/binanceController');
const okxController= require('../controllers/okxController');
const bybitController= require('../controllers/bybitController');

router.get('/binance/candles', binanceController.getBinanceCandles);

router.get('/okx/candles', okxController.getOkxCandles);

router.get('/bybit/candles', bybitController.getByBitCandles);

module.exports = router;
