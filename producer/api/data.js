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
      'OfficeKey': getRandomInt(),
      'OfficeName': faker.company.companyName(),
      'ModificationTimestamp': getTimestamp(),
    };
  },
  genMember () {
    return {
      'MemberKey': getRandomInt(),
      'MemberFirstName': faker.name.firstName(),
      'MemberLastName': faker.name.lastName(),
      'OfficeKey': getRandomKey(METADATA.OFFICE),
      'ModificationTimestamp': getTimestamp(),
    };
  },
  genProperty () {
    return {
      'ListingKey': getRandomInt(),
      'UnparsedAddress': `${faker.address.streetAddress()}, ${faker.address.streetName()}`,
      'ListPrice': faker.commerce.price(),
      'ListAgentKey': getRandomKey(METADATA.MEMBER),
      'ListOfficeKey': getRandomKey(METADATA.OFFICE),
      'ModificationTimestamp': getTimestamp(),
    };
  },
  genMedia () {
    return {
      'MediaKey': getRandomInt(),
      'ShortDescription': faker.lorem.words(),
      'MediaUrl': faker.internet.url(),
      'ResourceName': METADATA.Property,
      'ResourceRecordKey': getRandomKey(METADATA.PROPERTY),
      'ModificationTimestamp': getTimestamp(),
    };
  },
  genOpenHouse () {
    return {
      'OpenHouseKey': getRandomInt(),
      'ListingKey': getRandomKey(METADATA.PROPERTY),
      'OpenHouseDate': faker.date.future(),
      'ShowingAgentKey': getRandomKey(METADATA.MEMBER),
      'OpenHouseRemarks': faker.lorem.words(),
      'ModificationTimestamp': getTimestamp(),
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
  OFFICE: {name: 'Office', keyField: 'OfficeKey', generator: RAND.genOffice},
  MEMBER: {name: 'Member', keyField: 'MemberKey', generator: RAND.genMember},
  PROPERTY: {name: 'Property', keyField: 'ListingKey', generator: RAND.genProperty},
  MEDIA: {name: "Media", keyField: 'MediaKey', generator: RAND.genMedia},
  OPEN_HOUSE: {name: 'OpenHouse', keyField: 'OpenHouseKey', generator: RAND.genOpenHouse},
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
const getEvents = (from=0, to=null) => to ? _eventLog.slice(from, to) : _eventLog.slice(from);

const writeLogEvent = (resourceName, resourceKey) => {
  let resourceRecordUrl = createRecordUrl(resourceName, resourceKey),
      data = {
        'EntityEventSequence': _eventLog.length, 
        'ResourceName': resourceName, 
        'ResourceRecordKeyNumeric': resourceKey, 
        'ResourceRecordUrl': resourceRecordUrl
      };

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
