const express = require('express');
const app = express();
const port = 3000;

const {EVENTS, RESOURCE_DATA, RESOURCE_TYPES} = require('./data');

//TODO: 
//  * add relationships between objects
//  * object graph from log
//  * add fields hash not exposed through the interface so permissions can be handled
//  * mock event data
//  * replace with actual log payload from Kafka

app.get('/', (req, res) => res.send('Welcome to the Log Prototype App'));


// events endpoint
app.get('/events', (req, res) => {
  let {eventId = 0, expand = false} = req.query;
  let data = EVENTS.slice(eventId, EVENTS.length);

  if (expand) {
    data = data.map(getData);
  }
  
  res.send(data);
});
  
const getData = d => {
  switch (d.resourceType) {
    case RESOURCE_TYPES.OFFICE:
      return {...d, ...RESOURCE_DATA.Offices[d.resourceId]};
    case RESOURCE_TYPES.MEMBER:
      return {...d, ...RESOURCE_DATA.Members[d.resourceId]};
    case RESOURCE_TYPES.PROPERTY:
      return {...d, ...RESOURCE_DATA.Listings[d.resourceId]};
    case RESOURCE_TYPES.MEDIA:
      return {...d, ...RESOURCE_DATA.Media[d.resourceId]};
    default: 
      break;
  }
};

// start app
app.listen(port, () => console.log(`Log Prototype listening on ${port}!`));

