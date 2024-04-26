const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const header = require('./routers/header');
const linsk = require('./routers/links');
const theme = require('./routers/theme');
const auth = require('./routers/auth');
const user = require('./routers/user');

const app = express();

const MONGO_DB =
  `mongodb+srv://${ process.env.MONGO_DB_USER }:${ process.env.MONGO_DB_PASS }@cluster0.1epo1j2.mongodb.net/${ process.env.MONGO_DB_NAME }?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/icons', express.static(path.join(__dirname, 'icons')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/admin', header);
app.use('/admin', linsk);
app.use('/admin', theme);
app.use('/auth', auth);
app.use(user);

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
    app.listen(process.env.PORT || 2024);
  })
  .catch((err) => {
    console.log('YOUR-LINK', err);
  });