const express = require('express');
const bodyParser = require('body-parser');
const booksRoute = require('.routes/books');
const usersRoute = require('.routes/users');

const app = express();
app.use(bodyParser.json());

app.use('/books', booksRoute);
app.use('/users', usersRoute);

module.exports = app;