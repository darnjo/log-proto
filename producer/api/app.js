'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";
const APP_URL = process.env.APP_URL || `${HOST}:${PORT}`;

const {
  initData, 
  getEvent, 
  getEvents, 
  getResourceData,
  RAND,
} = require('./data');

app.get('/', (req, res) => res.send(
  '<h1>Welcome to the Log Prototype Producer API!</h1>' +
  '<h2>Available Services</h2>' + 
  '<h3>GET ' + APP_URL + '/EntityEvent</h3>' + 
    '<i>Retrieves all EntityEvents.</i>' + 
  '<h3>GET ' + APP_URL + '/EntityEvent[?$filter=EntityEvent [op] [value]]</h3>' + 
    '<i>Retrieves all EntityEvent items matching the given condition, where <op> can be one of the following operators:</i>' +
    '<ul><li>gt - greater than</li><li>gte - greater than or equal to</li><li>lt - less than</li>' +
    '<li>lte - less than or equal to</li><li>eq - equal to</li></ul>' + 
    '<i> and [value] is the EntityEventSequence to filter by</i>.' +
  '<h3>POST ' + APP_URL + '/genEvents/:numEvents</h3>' + 
    '<i>Randomly generates :numEvents EntityEvent items.</i>' + 
  '<h3>GET ' + APP_URL + '/:resource/:id</h3>' + 
    '<i>Retrieves :resource data for the given :id.</i>'
));

//  Just to prevent 400s in :resource
app.get('/favicon.ico', (req, res) => res.send(''));

// events endpoints
app.get('/EntityEvent', (req, res) => {
  let filterExp = req.query['$filter'] || '', op, value;

  if (filterExp.length && filterExp.includes('EntityEvent')) {
    [op, value] = filterExp.replace(/\s+/g, ' ').split(' ').slice(1, 3);
    value = parseInt(value);
  
    if (op && value) {
      switch (op) {
        case 'gt':
          return res.json(getEvents(value+1));
        case 'gte':
          return res.json(getEvents(value));
        case 'lt': 
          return res.json(getEvents(0, value));
        case 'lte':
          return res.json(getEvents(0, value+1));
        case 'eq': 
          return res.json(getEvents(value, value+1));
        default:
          res.status(500).send(
            `<b>ERROR:</b> Unsupported op passed to /EntityEvent! Op: ${op}<br />` +
            '<br />Supported operators:<ul><li>gt</li><li>gte</li></ul>' 
          );
      }
    }
  }
 
  //if no results, send everything as long as there's no query error
  res.json(getEvents());
});

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
    console.log(`\n>> Log Prototype Producer API listening on ${APP_URL}!`);
  }
);

