const RESOURCE_TYPES = {
  OFFICE: "Office",
  MEMBER: "Member",
  PROPERTY: "Property",
  MEDIA: "Media",
  OPEN_HOUSE: "OpenHouse",
};

//see TODO in app.js

const Offices = {
  1: {
    name: "Office 1", 
  },
  2: {
    name: "Office 2", 
  },
  3: {
    name: "Office 3", 
  },
  4: {
    name: "Office 4", 
  },
  5: {
    name: "Office 5", 
  },
  6: {
    name: "Office 6", 
  },
  7: {
    name: "Office 7", 
  },
};

const Members = {
  1: {
    name: "Member 1", 
    office: Offices[7],
  },
  2: {
    name: "Member 2", 
    office: Offices[6],
  },
  3: {
    name: "Member 3", 
    office: Offices[5],
  },
  4: {
    name: "Member 4", 
    office: Offices[4],
  },
  5: {
    name: "Member 5", 
    office: Offices[3],

  },
  6: {
    name: "Member 6", 
    office: Offices[2],
  },
  7: {
    name: "Member 7", 
    office: Offices[1],
  },
};

const Media = {
  1: {
    name: "Media 1", 
    url: "https://yolo.com/1.png", 
  },
  2: {
    name: "Media 2", 
    url: "https://yolo.com/2.png", 
  },
  3: {
    name: "Media 3", 
    url: "https://yolo.com/3.png", 
  },
  4: {
    name: "Media 4", 
    url: "https://yolo.com/4.png", 
  },
  5: {
    name: "Media 5", 
    url: "https://yolo.com/5.png", 
  },
  6: {
    name: "Media 6", 
    url: "https://yolo.com/6.png", 
  },
  7: {
    name: "Media 7", 
    url: "https://yolo.com/7.png", 
  },
  8: {
    name: "Media 8", 
    url: "https://yolo.com/8.png", 
  },
  9: {
    name: "Media 9", 
    url: "https://yolo.com/9.png", 
  },
};

const Listings = {
  1: {
    address: "1 Log Street",
    price: 123,
    members: [Members[3]],
    media: [Media[1], Media[2]],
  },
  2: {
    address: "2 Log Street",
    price: 234,
    members: [Members[2]], 
    media: [Media[9]],
  },
  3: {
    address: "3 Log Street",
    price: 345,
    members: [Members[1]], 
    media: [Media[3], Media[4]],
  },
  4: {
    address: "4 Log Street",
    price: 456,
    members: [Members[3]],
    media: [Media[8]],
  },
  5: {
    address: "5 Log Street",
    price: 567,
    members: [Members[5]], 
    media: [Media[5]],
  },
  6: {
    address: "6 Log Street",
    price: 678,
    members: [Members[7]], 
    media: [Media[6]],
  },
  7: {
    address: "7 Log Street",
    price: 789,
    members: [Members[6]], 
    media: [Media[7]],
  },
};

const EVENTS = [
  {eventId: 1, resourceType: RESOURCE_TYPES.OFFICE, resourceId: 1},
  {eventId: 2, resourceType: RESOURCE_TYPES.MEMBER, resourceId: 1},
  {eventId: 3, resourceType: RESOURCE_TYPES.PROPERTY, resourceId: 1},
  {eventId: 4, resourceType: RESOURCE_TYPES.MEDIA, resourceId: 1},
  {eventId: 5, resourceType: RESOURCE_TYPES.MEDIA, resourceId: 2},
  {eventId: 6, resourceType: RESOURCE_TYPES.MEDIA, resourceId: 3},
  {eventId: 7, resourceType: RESOURCE_TYPES.MEDIA, resourceId: 4},
  {eventId: 8, resourceType: RESOURCE_TYPES.MEDIA, resourceId: 5},
  {eventId: 9, resourceType: RESOURCE_TYPES.MEDIA, resourceId: 6},
  {eventId: 10, resourceType: RESOURCE_TYPES.MEMBER, resourceId: 2},
  {eventId: 11, resourceType: RESOURCE_TYPES.MEMBER, resourceId: 1},
  {eventId: 12, resourceType: RESOURCE_TYPES.OFFICE, resourceId: 2},
  {eventId: 13, resourceType: RESOURCE_TYPES.PROPERTY, resourceId: 2},
  {eventId: 14, resourceType: RESOURCE_TYPES.PROPERTY, resourceId: 3},
  {eventId: 15, resourceType: RESOURCE_TYPES.MEDIA, resourceId: 7},
  {eventId: 16, resourceType: RESOURCE_TYPES.MEDIA, resourceId: 8},
  {eventId: 17, resourceType: RESOURCE_TYPES.MEDIA, resourceId: 9},
  {eventId: 18, resourceType: RESOURCE_TYPES.MEDIA, resourceId: 3},
  {eventId: 19, resourceType: RESOURCE_TYPES.OFFICE, resourceId: 4},
  {eventId: 20, resourceType: RESOURCE_TYPES.OFFICE, resourceId: 5},
  {eventId: 21, resourceType: RESOURCE_TYPES.OFFICE, resourceId: 6},
  {eventId: 22, resourceType: RESOURCE_TYPES.MEMBER, resourceId: 1},
  {eventId: 23, resourceType: RESOURCE_TYPES.MEMBER, resourceId: 2},
  {eventId: 24, resourceType: RESOURCE_TYPES.MEMBER, resourceId: 3},
  {eventId: 25, resourceType: RESOURCE_TYPES.PROPERTY, resourceId: 1},
  {eventId: 26, resourceType: RESOURCE_TYPES.PROPERTY, resourceId: 2},
  {eventId: 27, resourceType: RESOURCE_TYPES.MEDIA, resourceId: 2},
];

module.exports = {
  RESOURCE_DATA : {Offices, Members, Listings, Media},
  EVENTS,
  RESOURCE_TYPES,
}
