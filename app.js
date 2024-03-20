const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// IMPORT-ROUTES
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/errorController');

// APP-CONFIGURATIONS
dotenv.config({ path: './config/dotenv.env' });
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin/', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server is successfully listenting at: http://localhost:${PORT}`.bgMagenta
  );
});
