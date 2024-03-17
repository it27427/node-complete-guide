const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const path = require('path');

const app = express();

dotenv.config({ path: './config/dotenv.env' });
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.send('Hello from express');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server is successfully listenting at: http://localhost:${PORT}`.bgGreen
  );
});
