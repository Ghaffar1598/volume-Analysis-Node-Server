const { RestClientV5 } = require('bybit-api');
const ccxt = require ('ccxt');
const client = new RestClientV5({
    testnet: true, // Use testnet: true for Bybit test environment
});

// Function to convert interval to Bybit format
const convertIntervalToBybitFormat = (interval) => {
    const mappings = {
        '1m': '1',
        '3m': '3',
        '5m': '5',
        '15m': '15',
        '30m': '30',
        '1h': '60',
        '2h': '120',
        '4h': '240',
        '6h': '360',
        '12h': '720',
        '1D': 'D',
        '1d': 'D',
        '1W': 'W',
        '1M': 'M',
    };

    return mappings[interval] || interval; // Return mapped value or original interval if not found
};

// Controller function to fetch Bybit Kline data
exports.getByBitCandles = async (req, res) => {
    let { symbol, interval, start, end, limit, category } = req.query;
    symbol = symbol.replace(/\//g, '');
    // Validation
    if (!symbol || !interval) {
        return res.status(400).send('Symbol and interval are required');
    }
    
    // Default values and parsing
    const bybitInterval = convertIntervalToBybitFormat(interval);
    const params = {
        category: category || 'spot', // Default to linear if category is not provided
        symbol: symbol.toUpperCase(),
        interval: bybitInterval,
    };

    if (start) {
        params.start = parseInt(start);
    }

    if (end) {
        params.end = parseInt(end);
    }

    if (limit) {
        params.limit = parseInt(limit);
    } else {
        params.limit = 200; // Default limit to 200 if not provided
    }

    try {
      // console.log(params)  
      const response = await client.getKline(params);
      console.log(response )
      // console.log(response)
      // Convert JSON data into arrays
const timestamps = [];
const open = [];
const high = [];
const low = [];
const close = [];
const volume = [];
const turnover = [];
const jsonData = response.result.list

// Iterate over JSON data and populate arrays
jsonData.forEach(data => {
    timestamps.push(data[0]);
    open.push(parseFloat(data[1]));
    high.push(parseFloat(data[2]));
    low.push(parseFloat(data[3]));
    close.push(parseFloat(data[4]));
    volume.push(parseFloat(data[5]));
    turnover.push(parseFloat(data[6]));
});

  dataset  = {
    "timestamp" : timestamps ,
    "open" : open ,
    "high" : high ,
    "low" : low ,
    "close" : close ,
    "volume" : volume
  }
  console.log(jsonData)
  res.json(dataset); // Assuming `result` contains the candlestick data
    } catch (error) {
        
        console.error('Error fetching Bybit candlestick data :', symbol+error);
        res.status(500).send('Error fetching Bybit candlestick data');
    }
};
// exports.getByBitCandles = async (req, res) => {
//     // let { symbol, interval, start, end, limit, category } = req.query;

//     // if (!symbol || !interval) {
//     //     return res.status(400).json({ error: 'Missing required query parameters: symbol, interval' });
//     // }
//     let markets
//     const exchange = new ccxt.bybit();
//     try {
//          markets = await exchange.fetchMarkets();
//          res.json( markets ); 
//         markets.forEach(market => {
//             // console.log(market.symbol);
//         });
//     } catch (error) {
//         console.error('Error fetching markets:', error);
//     }
//     exchange.options['defaultType'] = 'spot';
//     try {
//         // Convert start and end to milliseconds if they exist
//         start = start ? new Date(start).getTime() : undefined;
//         end = end ? new Date(end).getTime() : undefined;

//         // Fetch OHLCV data
//         const ohlcv = await exchange.fetchOHLCV(symbol, interval, start, end, { limit, category });
//         // const dataset = createDataFrame(ohlcv);
//         console.log( ohlcv )
//         res.json( markets ); // Send the formatted dataset
//     } catch (error) {
//         console.error('Error fetching Bybit candlestick data:', error);
//         res.status(500).send({"error" : error});
//     }
// };