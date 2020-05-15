const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys.js').mongoURL;

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((results) => {
    console.log('Successfully Connected');
  })
  .catch((error) => {
    console.log(error);
  });

//Passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport');

//Routes
require('./routes/api/users');

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
