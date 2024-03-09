const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const header = require('./routers/header');
const linsk = require('./routers/links');
const auth = require('./routers/auth');

const app = express();

const MONGO_DB = 'mongodb+srv://simo:ZXyrGnYr1ht2HqAv@cluster0.1epo1j2.mongodb.net/yourLink?retryWrites=true&w=majority';

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/admin', header);
app.use('/admin', linsk);
app.use('/auth', auth);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;

  res
    .status(status)
    .json({ message: message });
  next();
});

mongoose
  .connect(MONGO_DB)
  .then(() => {
    app.listen(2024);
  })
  .catch((err) => {
    console.log('YOUR-LINK', err);
  });