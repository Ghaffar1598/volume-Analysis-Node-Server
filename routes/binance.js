const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

router.get('/binance', marketController.getBinanceData);

// router.get('/okx', marketController.getBinanceData);

// router.get('/bitmax', marketController.getBinanceData);

module.exports = router;
