require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDb = require('./config/dbConnect');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

connectDb();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/', require('./routes'));

app.use((req, res, next) => {
  const error = new Error('Sorry, page not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
  next();
});

mongoose.connection.once('open', () => {
  console.log('Database Connected');
  app.listen(port, () => {
    console.log(`App is listening on PORT:${port}`);
  });
});
