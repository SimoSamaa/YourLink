const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  return res.send('<h1>express</h1>');
});

app.listen(2024);

// pass ZXyrGnYr1ht2HqAv