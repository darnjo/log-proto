/* Data Generation Service */

const faker = require('faker');

const DEFAULT_POOL_SIZE = 100
      OFFICE_POOL_SIZE = DEFAULT_POOL_SIZE,
      MEMBER_POOL_SIZE = DEFAULT_POOL_SIZE,
      PROPERTY_POOL_SIZE = 100 * DEFAULT_POOL_SIZE,
      MEDIA_POOL_SIZE = 100 * PROPERTY_POOL_SIZE,
      OPEN_HOUSE_POOL_SIZE = 10 * PROPERTY_POOL_SIZE;


//holds the local generated cache of items in memory
const _resourceCache = {
  Office: {},
  Member: {},
  Property: {},
  Media: {},
  OpenHouse: {},
};

//the event log is an array of events keyed by sequence number
//event schema is: {eventSequence, resourceName, resourceKey}
const _eventLog = [];

//generates an event log and related resource data
const dataInit = () => {
  randEvents(100000);
}

const writeLogEvent = (resourceName, resourceKey) => {
  let resourceRecordUrl = `http://localhost:3000/${resourceName}/${resourceKey}`;
  _eventLog.push({resourceName, resourceKey, resourceRecordUrl});
};

const getEvent = (eventSequence) => _eventLog[eventSequence];
const getEvents = (fromEventSequence=0) => _eventLog.slice(fromEventSequence);

//TODO: use something like JSM, which adds faker to JSON Schema models.
const randOffice = () => { 
  return { 
    'officeKey': Math.random(OFFICE_POOL_SIZE),
    'officeName': faker.company.companyName(),
  };
};

const randMember = () => {
  return {
    'memberKey': Math.random(MEMBER_POOL_SIZE),
    'memberFirstName': faker.name.nameFirst(),
    memberLastName: faker.name.nameLast(),
    officeKey: Math.random(OFFICE_POOL_SIZE),
  };
};

const randProperty = () => {
  return {
    listingKey: Math.random(PROPERTY_POOL_SIZE),
    unparsedAddress: faker.address.streetAddress() + faker.address.streetName(),
    listPrice: faker.commerce.price(),
    listAgentKey: Math.random(MEMBER_POOL_SIZE),
    listOfficeKey: Math.random(OFFICE_POOL_SIZE)
  };
};

const randMedia = () => {
  return {
    mediaKey: Math.random(MEDIA_POOL_SIZE),
    shortDescription: faker.lorem.words(),
    mediaUrl: faker.internet.url(),
    resourceName: 'Property',
    resourceRecordKey: Math.random(PROPERTY_POOL_SIZE)
  };
};

const randOpenHouse = () => {
  return {
    listingKey: Math.random(PROPERTY_POOL_SIZE),
    openHouseDate: faker.date.soon(),
    openHouseKey: Math.random(OPEN_HOUSE_POOL_SIZE),
    showingAgentKey: Math.random(MEMBER_POOL_SIZE),
    openHouseRemarks: faker.lorem.words(),
  };
};

const randEvents = (numEvents=1000) => {
  let data = null;
  Array(numEvents).forEach( () => {
    let {name, keyField, generator} = RESOURCE_META.keys[Math.random(RESOURCE_META.keys.length) - 1];
    data = generator.call(this);
    console.log(`name: ${name}, keyField: ${keyField}`);
    _resourceCache[name][keyField] = data;
    writeLogEvent(name, data[keyField])
  });
};

const RESOURCE_META = {
  OFFICE: { name: 'Office', keyField: 'OfficeKey', generator: randOffice },
  MEMBER: { name: 'Member', keyField: 'MemberKey', generator: randMember },
  PROPERTY: { name: 'Property', keyField: 'ListingKey', generator: randProperty },
  MEDIA: { name: 'Media', keyField: 'MediaKey', generator: randMedia },
  OPEN_HOUSE: { name: 'OpenHouse', keyField: 'OpenHouseID', generator: randOpenHouse },
};

module.exports = {
  getEvent,
  getEvents,
  dataInit,
}
