'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "http://localhost";
const APP_URL = `${HOST}:${PORT}`;


const {
  initData, 
  getEvent, 
  getEvents, 
  getResourceData,
  RAND,
} = require('./data');

app.get('/', (req, res) => res.send('Welcome to the Log Prototype Producer API!'));

//  Just to prevent 400s in :resource
app.get('/favicon.ico', (req, res) => res.send(''));

// events endpoints
app.get('/events', (req, res) => res.json(getEvents()));
app.get('/events/gte/:entityEventSequence', (req, res) => res.json(getEvents(req.params.entityEventSequence)));
app.post('/genEvents/:numEvents', (req, res) => {
  const NUM_EVENTS_DEFAULT = 100;
  RAND.genEvents(req.params.numEvents || NUM_EVENTS_DEFAULT); 
  res.sendStatus(200);
}); 

// data retrieval
app.get('/:resource/:id', (req, res) => res.json(getResourceData(req.params.resource, req.params.id)));


// start app
app.listen(PORT, () => {
    initData(APP_URL);
    console.log(`Log Prototype Producer API listening on ${APP_URL}!`);
  }
);

