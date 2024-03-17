const express = require('express');
const multer = require('multer');
const path = require('path');
const id = require('uuid').v4();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const header = require('./routers/header');
const linsk = require('./routers/links');
const auth = require('./routers/auth');
const user = require('./routers/user');

const app = express();

const MONGO_DB = 'mongodb+srv://simo:ZXyrGnYr1ht2HqAv@cluster0.1epo1j2.mongodb.net/yourLink?retryWrites=true&w=majority';

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, id + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png'
    || file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, filter: fileFilter }).single('userImg'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/admin', header);
app.use('/admin', linsk);
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
    app.listen(2024);
  })
  .catch((err) => {
    console.log('YOUR-LINK', err);
  });