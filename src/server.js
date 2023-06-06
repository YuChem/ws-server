const express = require('express');

const app = express();

app.get('/data', (req, res) => {
  try {
    app.log.log('debug', 'test route');
    res.status(200).send('OK');
  } catch (err) {
    app.log.error(`${err}`);

    res.status(500).type('text/plain').send(`${err}`);
  }
});

if (process.env.NODE_ENV === 'test') {
  // supress automatic error handling
  app.use((err, req, res, next) => {
    app.log.error(err.stack);
    res.status(500);
  });
}

const server = app;

module.exports = server;
