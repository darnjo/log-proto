/* Data Generation Service */

const faker = require('faker');
const _cliProgress = require('cli-progress');
const DEBUG = false;

const DEFAULT_POOL_SIZE = 10**4;
const createRecordUrl = (resourceName, resourceKey) => `${this.appUrl}/${resourceName}/${resourceKey}`; 
const getRandomInt = (size=Number.MAX_SAFE_INTEGER) => Math.floor(Math.random() * Math.floor(size));
const getTimestamp = () => new Date().toISOString();

const LOG = msg => {if (DEBUG) console.log(`[${getTimestamp()}]: ${msg}`);};

const RAND = {
  //TODO: use something like JSM, which adds faker to JSON Schema models.
  genOffice () { 
    return {
      officeKey: getRandomInt(),
      officeName: faker.company.companyName(),
      modificationTimestamp: getTimestamp(),
    };
  },
  genMember () {
    return {
      memberKey: getRandomInt(),
      memberFirstName: faker.name.firstName(),
      memberLastName: faker.name.lastName(),
      officeKey: getRandomKey(METADATA.OFFICE),
      modificationTimestamp: getTimestamp(),
    };
  },
  genProperty () {
    return {
      listingKey: getRandomInt(),
      unparsedAddress: `${faker.address.streetAddress()}, ${faker.address.streetName()}`,
      listPrice: faker.commerce.price(),
      listAgentKey: getRandomKey(METADATA.MEMBER),
      listOfficeKey: getRandomKey(METADATA.OFFICE),
      modificationTimestamp: getTimestamp(),
    };
  },
  genMedia () {
    return {
      mediaKey: getRandomInt(),
      shortDescription: faker.lorem.words(),
      mediaUrl: faker.internet.url(),
      resourceName: METADATA.Property,
      resourceRecordKey: getRandomKey(METADATA.PROPERTY),
      modificationTimestamp: getTimestamp(),
    };
  },
  genOpenHouse () {
    return {
      openHouseKey: getRandomInt(),
      listingKey: getRandomKey(METADATA.PROPERTY),
      openHouseDate: faker.date.future(),
      showingAgentKey: getRandomKey(METADATA.MEMBER),
      openHouseRemarks: faker.lorem.words(),
      modificationTimestamp: getTimestamp(),
    };
  },
  genEvents (numEvents=DEFAULT_POOL_SIZE) {
    const _generatorProgressBar = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);
    
    let data, eventData, total = 0, key, totalEvents = numEvents * Object.keys(METADATA).length;
    
    console.log(`\nGenerating ${totalEvents} Events!`);
    _generatorProgressBar.start(totalEvents, 0, {speed: 1000});

    Object.keys(METADATA).forEach(keyName => {
      let {name, keyField, generator} = METADATA[keyName];

      for (let i = 0; i < numEvents; i++) {
        data = (generator)();
        key = data[keyField];

        setResourceData(keyName, key, data);
        eventData = writeLogEvent(name, key);
        LOG(`Event Written: eventSequence: ${total}, name: ${name}, keyField: ${keyField}, key: ${data[`${keyField}`]},
          resourceRecordUrl: ${eventData.resourceRecordUrl}`);

        total += 1;
        _generatorProgressBar.increment();
      } 
    });
   
    _generatorProgressBar.stop();
    if (_eventLog.length > total) {
      console.log(`\nTotal log entries: ${_eventLog.length}\n`);
    }
  },
};

const METADATA = {
  OFFICE: {name: 'Office', keyField: 'officeKey', generator: RAND.genOffice},
  MEMBER: {name: 'Member', keyField: 'memberKey', generator: RAND.genMember},
  PROPERTY: {name: 'Property', keyField: 'listingKey', generator: RAND.genProperty},
  MEDIA: {name: "Media", keyField: 'mediaKey', generator: RAND.genMedia},
  OPEN_HOUSE: {name: 'OpenHouse', keyField: 'openHouseKey', generator: RAND.genOpenHouse},
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
//event schema is: {resourceName, resourceKey, resourceRecordUrl}
const _eventLog = [];

//generates an event log and related resource data
const initData = (appUrl) => {
  if (this._isInited) {
    console.log('Data service already init-ed...ignoring');
    return;
  }

  this.appUrl = appUrl;

  console.log(`Event generation started. Pool size is ${DEFAULT_POOL_SIZE} events for each resource.`);
  
  RAND.genEvents(DEFAULT_POOL_SIZE);
  
  console.log('\nSample data:');
  Object.keys(METADATA).forEach(key => {
    let {name, keyField} = METADATA[key], {keyCache} = _resourceCache[name];
    console.log(`\t${name}: ${createRecordUrl(name, keyCache[0])}`);
  });

  this._isInited = true;
}

const getEvent = (eventSequence) => _eventLog[eventSequence];
const getEvents = (fromEventSequence=0) => _eventLog.slice(fromEventSequence);

const writeLogEvent = (resourceName, resourceKey) => {
  let resourceRecordUrl = createRecordUrl(resourceName, resourceKey);
  let data = {resourceName, resourceKey, resourceRecordUrl}
  _eventLog.push(data);
  return data;
};

const getResourceData = (resourceName, resourceId) => _resourceCache[resourceName][resourceId] || null;
const setResourceData = (keyName, resourceId, data={}) => {
  let resourceName = METADATA[keyName].name,
      resource = _resourceCache[resourceName][resourceId];

  if (!resource) {
    resource = (METADATA[keyName].generator)();
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


module.exports = {
  getEvent,
  getEvents,
  initData,
  getResourceData,
  RAND
}
