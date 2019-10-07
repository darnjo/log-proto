'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "http://localhost";
const APP_URL = `${HOST}:${PORT}`;

app.get('/', (req, res) => res.send('Welcome to the Log Prototype Consumer API!'));

//  Just to prevent 400s in :resource
app.get('/favicon.ico', (req, res) => res.send(''));

// start app
app.listen(PORT, () => {
    console.log(`Log Prototype Consumer API listening on ${APP_URL}!`);
  }
);

