const RESOURCE_TYPES = {
  OFFICE: { name: 'Office', keyField: 'OfficeKey' },
  MEMBER: { name: 'Member', keyField: 'MemberKey' },
  PROPERTY: { name: 'Property', keyField: 'ListingKey' },
  MEDIA: { name: 'Media', keyField: 'MediaKey' },
  OPEN_HOUSE: { name: 'OpenHouse', keyField: 'OpenHouseID' }
};

const RESOURCE_NAMES = {
  Office: 'OFFICE',
  Member: 'MEMBER',
  Property: 'PROPERTY',
  Media: 'MEDIA',
  OpenHouse: 'OPEN_HOUSE'
};

//see TODO in app.js

const OFFICE = [
  {
    OfficeKey: 1,
    OfficeName: "Office 1"
  },
  {
    OfficeKey: 2,
    OfficeName: "Office 2"
  },
  {
    OfficeKey: 3,
    OfficeName: "Office 3"
  },
  {
    OfficeKey: 4,
    OfficeName: "Office 4"
  },
  {
    OfficeKey: 5,
    OfficeName: "Office 5"
  },
  {
    OfficeKey: 6,
    OfficeName: "Office 6"
  },
  {
    OfficeKey: 7,
    OfficeName: "Office 7"
  }
];

const MEMBER = [
  {
    MemberKey: 1,
    MemberFullName: "Member 1",
    OfficeKey: OFFICE[6].OfficeKey
  },
  {
    MemberKey: 2,
    MemberFullName: "Member 2",
    OfficeKey: OFFICE[5].OfficeKey
  },
  {
    MemberKey: 3,
    MemberFullName: "Member 3",
    OfficeKey: OFFICE[4].OfficeKey
  },
  {
    MemberKey: 4,
    MemberFullName: "Member 4",
    OfficeKey: OFFICE[3].OfficeKey
  },
  {
    MemberKey: 5,
    MemberFullName: "Member 5",
    OfficeKey: OFFICE[2].OfficeKey

  },
  {
    MemberKey: 6,
    MemberFullName: "Member 6",
    OfficeKey: OFFICE[1].OfficeKey
  },
  {
    MemberKey: 7,
    MemberFullName: "Member 7",
    OfficeKey: OFFICE[0].OfficeKey
  }
];

const PROPERTY = [
  {
    ListingKey: 1,
    UnparsedAddress: "1 Log Street",
    ListPrice: 123,
    ListAgentKey: MEMBER[3].MemberKey,
    ListOfficeKey: OFFICE[0].OfficeKey
  },
  {
    ListingKey: 2,
    UnparsedAddress: "2 Log Street",
    ListPrice: 234,
    ListAgentKey: MEMBER[1].MemberKey,
    ListOfficeKey: OFFICE[1].OfficeKey
  },
  {
    ListingKey: 3,
    UnparsedAddress: "3 Log Street",
    ListPrice: 345,
    ListAgentKey: MEMBER[0].MemberKey,
    ListOfficeKey: OFFICE[2].OfficeKey
  },
  {
    ListingKey: 4,
    UnparsedAddress: "4 Log Street",
    ListPrice: 456,
    ListAgentKey: MEMBER[2].MemberKey,
    ListOfficeKey: OFFICE[3].OfficeKey
  },
  {
    ListingKey: 5,
    UnparsedAddress: "5 Log Street",
    ListPrice: 567,
    ListAgentKey: MEMBER[4].MemberKey,
    ListOfficeKey: OFFICE[4].OfficeKey
  },
  {
    ListingKey: 6,
    UnparsedAddress: "6 Log Street",
    ListPrice: 678,
    ListAgentKey: MEMBER[6].MemberKey,
    ListOfficeKey: OFFICE[5].OfficeKey
  },
  {
    ListingKey: 7,
    UnparsedAddress: "7 Log Street",
    ListPrice: 789,
    ListAgentKey: MEMBER[5].MemberKey,
    ListOfficeKey: OFFICE[6].OfficeKey
  }
];

const MEDIA = [
  {
    MediaKey: 1,
    ShortDescription: "Media 1",
    MediaURL: "https://yolo.com/1.png",
    ResourceName: 'Property',
    ResourceRecordKey: PROPERTY[0].ListingKey
  },
  {
    MediaKey: 2,
    ShortDescription: "Media 2",
    MediaURL: "https://yolo.com/2.png",
    ResourceName: 'Property',
    ResourceRecordKey: PROPERTY[0].ListingKey
  },
  {
    MediaKey: 3,
    ShortDescription: "Media 3",
    MediaURL: "https://yolo.com/3.png",
    ResourceName: 'Property',
    ResourceRecordKey: PROPERTY[2].ListingKey
  },
  {
    MediaKey: 4,
    ShortDescription: "Media 4",
    MediaURL: "https://yolo.com/4.png",
    ResourceName: 'Property',
    ResourceRecordKey: PROPERTY[2].ListingKey
  },
  {
    MediaKey: 5,
    ShortDescription: "Media 5",
    MediaURL: "https://yolo.com/5.png",
    ResourceName: 'Property',
    ResourceRecordKey: PROPERTY[4].ListingKey
  },
  {
    MediaKey: 6,
    ShortDescription: "Media 6",
    MediaURL: "https://yolo.com/6.png",
    ResourceName: 'Property',
    ResourceRecordKey: PROPERTY[5].ListingKey
  },
  {
    MediaKey: 7,
    ShortDescription: "Media 7",
    MediaURL: "https://yolo.com/7.png",
    ResourceName: 'Property',
    ResourceRecordKey: PROPERTY[6].ListingKey
  },
  {
    MediaKey: 8,
    ShortDescription: "Media 8",
    MediaURL: "https://yolo.com/8.png",
    ResourceName: 'Property',
    ResourceRecordKey: PROPERTY[3].ListingKey
  },
  {
    MediaKey: 9,
    ShortDescription: "Media 9",
    MediaURL: "https://yolo.com/9.png",
    ResourceName: 'Property',
    ResourceRecordKey: PROPERTY[1].ListingKey
  }
];

const RESOURCE_DATA = {
  OFFICE,
  MEMBER,
  PROPERTY,
  MEDIA
}

const eventOrder = [
  { resource: 'OFFICE', item: 0 },
  { resource: 'MEMBER', item: 0 },
  { resource: 'PROPERTY', item: 0 },
  { resource: 'MEDIA', item: 0 },
  { resource: 'MEDIA', item: 1 },
  { resource: 'MEDIA', item: 2 },
  { resource: 'MEDIA', item: 3 },
  { resource: 'MEDIA', item: 4 },
  { resource: 'MEDIA', item: 5 },
  { resource: 'MEMBER', item: 1 },
  { resource: 'MEMBER', item: 0 },
  { resource: 'OFFICE', item: 1 },
  { resource: 'PROPERTY', item: 1 },
  { resource: 'PROPERTY', item: 2 },
  { resource: 'MEDIA', item: 6 },
  { resource: 'MEDIA', item: 7 },
  { resource: 'MEDIA', item: 8 },
  { resource: 'MEDIA', item: 2 },
  { resource: 'OFFICE', item: 3 },
  { resource: 'OFFICE', item: 4 },
  { resource: 'OFFICE', item: 5 },
  { resource: 'MEMBER', item: 0 },
  { resource: 'MEMBER', item: 1 },
  { resource: 'MEMBER', item: 2 },
  { resource: 'PROPERTY', item: 0 },
  { resource: 'PROPERTY', item: 1 },
  { resource: 'MEDIA', item: 1 }
];

const EVENTS = [];
let eventCounter = 1;

eventOrder.forEach(e => {
  const ResourceName = RESOURCE_TYPES[e.resource].name;
  const keyField = RESOURCE_TYPES[e.resource].keyField;

  EVENTS.push({
    EventSequenceNumeric: eventCounter++,
    ResourceName,
    ResourceRecordKeyNumeric: RESOURCE_DATA[e.resource][e.item][keyField],
    ResourceRecordURL: `http://localhost:3000/${ResourceName}/${RESOURCE_DATA[e.resource][e.item][keyField]}`
  })
});

module.exports = {
  RESOURCE_DATA,
  EVENTS,
  RESOURCE_TYPES,
  RESOURCE_NAMES
}
