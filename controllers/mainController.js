const axios = require('axios');

const binanceBaseUrl = 'https://api.binance.com/api/v3/klines';

exports.getBinanceCandles = async (req, res) => {
  const { symbol, interval, startTime, endTime, limit } = req.query;

  if (!symbol || !interval) {
    return res.status(400).send('Symbol and interval are required');
  }

  try {
    const params = {
      symbol: symbol.toUpperCase(),
      interval
    };

    if (startTime) params.startTime = startTime;
    if (endTime) params.endTime = endTime;
    if (limit) params.limit = limit;

    const response = await axios.get(binanceBaseUrl, { params });
    const candles = response.data;
    
    res.json(candles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Binance candlestick data');
  }
};
