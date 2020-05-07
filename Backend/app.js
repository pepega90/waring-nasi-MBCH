const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const todoRoute = require('./routes/todo');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(todoRoute);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const errStatus = error.errStatus;
  res.status(status).json({ message: message, errStatus: errStatus });
});

mongoose
  .connect(
    'mongodb+srv://aji:devikinal90@cluster0-7im4l.mongodb.net/caffeApp',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(8080);
    console.log('Connected to mongodb');
  });
