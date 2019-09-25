/* Data Generation Service */

const DEBUG = false;
const DEFAULT_POOL_SIZE = 10**5;
const HOST = "http://localhost:3000";
const createRecordUrl = (resourceName, resourceKey) => `${HOST}/${resourceName}/${resourceKey}`;
const getRandomInt = (size=Number.MAX_SAFE_INTEGER) => Math.floor(Math.random() * Math.floor(size));

const faker = require('faker');
const _cliProgress = require('cli-progress');
const _generatorProgressBar = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);

const LOG = msg => {if (DEBUG) console.log(msg)};

const METADATA = {
  OFFICE: {name: 'Office', keyField: 'officeKey', generator: 'randOffice'},
  MEMBER: {name: 'Member', keyField: 'memberKey', generator: 'randMember'},
  PROPERTY: {name: 'Property', keyField: 'listingKey', generator: 'randProperty'},
  MEDIA: {name: "Media", keyField: 'mediaKey', generator: 'randMedia'},
  OPEN_HOUSE: {name: 'OpenHouse', keyField: 'openHouseKey', generator: 'randOpenHouse'},
};

//holds the local generated cache of items in memory
const _resourceCache = {
  [`${METADATA.OFFICE.name}`]: {keyCache: []},
  [`${METADATA.MEMBER.name}`]: {keyCache: []},
  [`${METADATA.PROPERTY.name}`]: {keyCache: []},
  [`${METADATA.MEDIA.name}`]: {keyCache: []},
  [`${METADATA.OPEN_HOUSE.name}`]: {keyCache: []},
};

//the event log is an array of events keyed by sequence number
//where the sequence number is the array index.
//event schema is: {resourceName, resourceKey}
const _eventLog = [];

//generates an event log and related resource data
const initData = () => {
  console.log(`Event generation started. Pool size is ${DEFAULT_POOL_SIZE} events for each resource.`);
  _generatorProgressBar.start(DEFAULT_POOL_SIZE * Object.keys(METADATA).length, 0);
  
  randEvents(DEFAULT_POOL_SIZE);
  
  _generatorProgressBar.stop();
  console.log(`Event generation complete.`);

  console.log('\nSample data:');
  Object.keys(METADATA).forEach(key => {
    let {name, keyField} = METADATA[key], {keyCache} = _resourceCache[name];
    console.log(`\t${name}: ${createRecordUrl(name, keyCache[0])}`);
  });
  console.log();
}

const getEvent = (eventSequence) => _eventLog[eventSequence];
const getEvents = (fromEventSequence=0) => _eventLog.slice(fromEventSequence);

const writeLogEvent = (resourceName, resourceKey) => {
  let resourceRecordUrl = createRecordUrl(resourceName, resourceKey);
  LOG(`resourceName: ${resourceName}, resourceKey: ${resourceKey}, resourceRecordUrl: ${resourceRecordUrl}`);
  _eventLog.push({resourceName, resourceKey, resourceRecordUrl})
};

const getResourceData = (resourceName, resourceId) => _resourceCache[resourceName][resourceId] || null;
const setResourceData = (keyName, resourceId, data={}) => {
  let resourceName = METADATA[keyName].name,
      resource = _resourceCache[resourceName][resourceId];

  if (!resource) {
    resource = eval(METADATA[keyName].generator)();
    resource[METADATA.keyField] = resourceId;
    _resourceCache[resourceName].keyCache.push(resourceId);
  }
  _resourceCache[resourceName][resourceId] = data;
  return resource;
};

const getRandomKey = resourceMeta => {
  let {name} = resourceMeta, {keyCache} = _resourceCache[name];
  return getResourceData(name, keyCache[getRandomInt(keyCache.length)])[resourceMeta.keyField];
};

//TODO: use something like JSM, which adds faker to JSON Schema models.
const randOffice = () => { 
  return {
    officeKey: getRandomInt(),
    officeName: faker.company.companyName(),
  };
};

const randMember = () => {
  return {
    memberKey: getRandomInt(),
    memberFirstName: faker.name.firstName(),
    memberLastName: faker.name.lastName(),
    officeKey: getRandomKey(METADATA.OFFICE),
  };
};

const randProperty = () => {
  return {
    listingKey: getRandomInt(),
    unparsedAddress: `${faker.address.streetAddress()}, ${faker.address.streetName()}`,
    listPrice: faker.commerce.price(),
    listAgentKey: getRandomKey(METADATA.MEMBER),
    listOfficeKey: getRandomKey(METADATA.OFFICE),
  };
};

const randMedia = () => {
  return {
    mediaKey: getRandomInt(),
    shortDescription: faker.lorem.words(),
    mediaUrl: faker.internet.url(),
    resourceName: METADATA.Property,
    resourceRecordKey: getRandomKey(METADATA.PROPERTY),
  };
};

const randOpenHouse = () => {
  return {
    openHouseKey: getRandomInt(),
    listingKey: getRandomKey(METADATA.PROPERTY),
    openHouseDate: faker.date.future(),
    showingAgentKey: getRandomKey(METADATA.MEMBER),
    openHouseRemarks: faker.lorem.words(),
  };
};

const randEvents = (numEvents=1000) => {
  let data, total = 0, key;

  Object.keys(METADATA).forEach(keyName => {
    let {name, keyField, generator} = METADATA[keyName];

    for (let i = 0; i < numEvents; i++) {
      total += 1;
      data = eval(generator)(); //ohhh so eval
      key = data[keyField];
      LOG(`eventSequence: ${total}, name: ${name}, keyField: ${keyField}, key: ${data[`${keyField}`]}`);
      setResourceData(keyName, key, data);
      writeLogEvent(name, key);
      _generatorProgressBar.increment();
    } 
  });
};

module.exports = {
  getEvent,
  getEvents,
  initData,
  getResourceData,
}
