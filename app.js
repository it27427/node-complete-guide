const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const path = require('path');

const app = express();

// IMPORT-ROUTES
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

// APP-CONFIGURATIONS
dotenv.config({ path: './config/dotenv.env' });
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/', shopRoutes);
app.use('/api/', adminRoutes);

app.get('/', (req, res, next) => {
  res.send('Hello from express');
});

app.use((req, res, next) => {
  res.status(404).send('<h1>Page Not Found!</h1>');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server is successfully listenting at: http://localhost:${PORT}`.bgGreen
  );
});
