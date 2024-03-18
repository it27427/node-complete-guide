const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const path = require('path');

const app = express();

app.set('view engine', 'pug');
// app.set('view engine', 'ejs');
app.set('views', 'views');

// IMPORT-ROUTES
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// APP-CONFIGURATIONS
dotenv.config({ path: './config/dotenv.env' });
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin/', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server is successfully listenting at: http://localhost:${PORT}`.bgMagenta
  );
});
