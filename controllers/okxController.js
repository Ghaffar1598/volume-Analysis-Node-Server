const axios = require('axios');
const ccxt = require ('ccxt');
const okxBaseUrl = 'https://www.okx.com/api/v5/market/candles';



exports.getOkxCandles = async (req, res) => {
  let { symbol, interval, start, end, limit, category } = req.query;

  if (!symbol || !interval) {
      return res.status(400).json({ error: 'Missing required query parameters: symbol, interval' });
  }
  
  const exchange = new ccxt.okx();
  exchange.options['defaultType'] = 'spot';
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

// exports.getOkxCandles = async (req, res) => {
//   let { symbol, interval, start, end, limit } = req.query;
//     console.log(symbol)
//   symbol = symbol.replace(/\//g, '-');
//   if (!symbol || !interval) {
//     return res.status(400).send('Symbol and interval are required');
//   }

//   try {
//     const params = {
//       instId: symbol.toUpperCase(),
//       bar: interval.toUpperCase()
//     };

//     if (start) params.after = start;
//     if (end) params.before = end;
//     if (limit) params.limit = limit;

//     const response = await axios.get(okxBaseUrl, { params });
//     const candles = response.data.data;
//     console.log(params)
//     // console.log(response)
    
//       const timestamps = [];
//         const open = [];
//         const high = [];
//         const low = [];
//         const close = [];
//         const volume = [];
//         const turnover = [];
        
//         candles.forEach(data => {
//         timestamps.push(data[0]);
//         open.push(parseFloat(data[1]));
//         high.push(parseFloat(data[2]));
//         low.push(parseFloat(data[3]));
//         close.push(parseFloat(data[4]));
//         volume.push(parseFloat(data[5]));
   
//     });
//     dataset  = {
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
//     res.status(500).send('Error fetching OKX candlestick data');
//   }
// };