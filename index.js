const express = require('express');
const app = express();
const port = 9000;
const marketDataRoutes = require('./routes/marketdata');

app.use('/marketData', marketDataRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`);
});
