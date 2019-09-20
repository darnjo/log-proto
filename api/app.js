'use strict';

const express = require('express');
const app = express();
const port = 3000;

const {dataInit, getEvent, getEvents} = require('./data');

//TODO:
//  * add relationships between objects
//  * object graph from log
//  * add fields hash not exposed through the interface so permissions can be handled
//  * mock event data
//  * replace with actual log payload from Kafka

app.get('/', (req, res) => res.send('Welcome to the Log Prototype App'));

//  Just to prevent 400s in :resource
app.get('/favicon.ico', (req, res) => {
  res.send('');
});

// events endpoint
app.get('/events', (req, res) => {
  let {EventSequenceNumeric = 0} = req.query;
  let data = EVENTS.slice(EventSequenceNumeric, EVENTS.length);

  res.send(data);
});

app.get('/:resource', (req, res) => {
  const expand = !!req.query.expand;
  const resourceType = RESOURCE_NAMES[req.params.resource];
  let responseData;

  if (!resourceType) return res.sendStatus(400).send('Bad Resource');

  if (expand) responseData = RESOURCE_DATA[resourceType].map(getData(resourceType));
  else responseData = RESOURCE_DATA[resourceType];

  res.send(responseData);
});

app.get('/:resource/:id', (req, res) => {
  const expand = !!req.query.expand;
  const resourceType = RESOURCE_NAMES[req.params.resource];

  if (!resourceType) return res.sendStatus(400).send('Bad Resource');

  const record = RESOURCE_DATA[resourceType].find(r => r[RESOURCE_TYPES[resourceType].keyField] == req.params.id);

  if (!record) return res.sendStatus(404);

  res.send(record);
});

// This isn't pretty
const getData = (resourceType) => {
  return (d) => {
    const expandedRecord = { ...d };

    if (d.OfficeKey && resourceType !== 'OFFICE') {
      expandedRecord.Office = RESOURCE_DATA.OFFICE.find(o => o.OfficeKey === d.OfficeKey);
    }

    if (d.ListAgentKey) {
      expandedRecord.Member = RESOURCE_DATA.MEMBER.find(m => m.MemberKey === d.ListAgentKey);
    }

    if (d.ListOfficeKey) {
      expandedRecord.Office = RESOURCE_DATA.OFFICE.find(o => o.OfficeKey === d.ListOfficeKey);
    }

    if (d.ResourceName && d.ResourceRecordKey) {
      const expandedType = RESOURCE_NAMES[d.ResourceName];
      expandedRecord[d.ResourceName] = RESOURCE_DATA[expandedType].find(r => r[RESOURCE_TYPES[expandedType].keyField] === d.ResourceRecordKey);
    }

    return expandedRecord;
  }
};

// start app
app.listen(port, () => {
    dataInit();
    console.log(`Log Prototype listening on ${port}!`);
  }
);
