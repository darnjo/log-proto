'use strict';

const express = require('express');
const app = express();
const port = 3000;

const {
  initData, getEvent, getEvents, getResourceData} = require('./data');

app.get('/', (req, res) => res.send('Welcome to the Log Prototype App'));

//  Just to prevent 400s in :resource
app.get('/favicon.ico', (req, res) => {
  res.send('');
});

// events endpoint
app.get('/events', (req, res) => res.json(getEvents()));

app.get('/events/gte/:entityEventSequence', (req, res) => res.json(getEvents(req.params.entityEventSequence)));

app.get('/:resource/:id', (req, res) => res.json(getResourceData(req.params.resource, req.params.id)));

// start app
app.listen(port, () => {
    initData();
    console.log(`Log Prototype listening on ${port}!`);
  }
);
