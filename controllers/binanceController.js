const axios = require('axios');
const ccxt = require ('ccxt');
const binanceBaseUrl = 'https://api.binance.com/api/v3/klines';



exports.getBinanceCandles = async (req, res) => {
  let { symbol, interval, start, end, limit, category } = req.query;

  if (!symbol || !interval) {
      return res.status(400).json({ error: 'Missing required query parameters: symbol, interval' });
  }
  
  const exchange = new ccxt.binance();
  
  try {
      // Convert start and end to milliseconds if they exist
      start = start ? new Date(start).getTime() : undefined;
      end = end ? new Date(end).getTime() : undefined;
  
      // Fetch OHLCV data
      const ohlcv = await exchange.fetchOHLCV(symbol, interval, start, end, { limit, category });
      // const dataset = createDataFrame(ohlcv);
      // console.log( ohlcv )
      res.json( ohlcv ); // Send the formatted dataset
  } catch (error) {
      console.error('Error fetching Bybit candlestick data:', error);
      res.status(500).send({"error" : error});
  }
};
// exports.getBinanceCandles = async (req, res) => {
//   let { symbol, interval, startTime, endTime, limit } = req.query;

//   symbol = symbol.replace(/\//g, '');

//   if (!symbol || !interval) {
//     return res.status(400).send('Symbol and interval are required');
//   }

//   try {
//     const params = {
//       symbol: symbol.toUpperCase(),
//       interval
//     };

//     if (startTime) params.startTime = startTime;
//     if (endTime) params.endTime = endTime;
//     if (limit) params.limit = limit;

//     const response = await axios.get(binanceBaseUrl, { params });

//     const candles = response.data;
//     const timestamps = [];
//     const open = [];
//     const high = [];
//     const low = [];
//     const close = [];
//     const volume = [];
//     const turnover = [];
//     candles.forEach(data => {
//         timestamps.push(data[0]);
//         open.push(parseFloat(data[1]));
//         high.push(parseFloat(data[2]));
//         low.push(parseFloat(data[3]));
//         close.push(parseFloat(data[4]));
//         volume.push(parseFloat(data[5]));
//         turnover.push(parseFloat(data[6]));
//     });
    
//       dataset  = {
//         "timestamp" : timestamps ,
//         "open" : open ,
//         "high" : high ,
//         "low" : low ,
//         "close" : close ,
//         "volume" : volume
//       }
//       res.json(dataset);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching Binance candlestick data');
//   }
// };
