const express = require('express');
const router = express.Router();

router.get('/admin', (req, res, next) => {
  res.send('<h1>Admin Page By Routing</h1>');
});

module.exports = router;
