const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const indexRoute = require('./Routes/index')
const cors = require('cors')
const port = process.env.PORT || 8080;
const app = express();


app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Header',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
      );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  
    next();
  })
  .use(cors())
  .use('/', indexRoute);

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});