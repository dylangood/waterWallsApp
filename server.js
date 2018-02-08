// dependencies
const express = require('express');
const app = express();
const port = process.env.PORT || 1717;
const bodyParser = require('body-parser');

// configure app
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  next();
});
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routing
app.use(require('./server/routes'));

// start server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
