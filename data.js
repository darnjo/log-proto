const RESOURCE_TYPES = {
  OFFICE: "Office",
  MEMBER: "Member",
  PROPERTY: "Property",
  MEDIA: "Media",
  OPEN_HOUSE: "OpenHouse",
};

//see TODO in app.js

const Offices = [
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

const Members = [
  {
    MemberKey: 1,
    MemberFullName: "Member 1",
    OfficeKey: Offices[6].OfficeKey
  },
  {
    MemberKey: 2,
    MemberFullName: "Member 2",
    OfficeKey: Offices[5].OfficeKey
  },
  {
    MemberKey: 3,
    MemberFullName: "Member 3",
    OfficeKey: Offices[4].OfficeKey
  },
  {
    MemberKey: 4,
    MemberFullName: "Member 4",
    OfficeKey: Offices[3].OfficeKey
  },
  {
    MemberKey: 5,
    MemberFullName: "Member 5",
    OfficeKey: Offices[2].OfficeKey

  },
  {
    MemberKey: 6,
    MemberFullName: "Member 6",
    OfficeKey: Offices[1].OfficeKey
  },
  {
    MemberKey: 7,
    MemberFullName: "Member 7",
    OfficeKey: Offices[0].OfficeKey
  }
];

const Media = [
  {
    MediaKey: 1,
    ShortDescription: "Media 1",
    MediaURL: "https://yolo.com/1.png",
    ResoureName: 'Property',
    ResourceRecordKey: Listings[0].ListingKey
  },
  {
    MediaKey: 2,
    ShortDescription: "Media 2",
    MediaURL: "https://yolo.com/2.png",
    ResoureName: 'Property',
    ResourceRecordKey: Listings[0].ListingKey
  },
  {
    MediaKey: 3,
    ShortDescription: "Media 3",
    MediaURL: "https://yolo.com/3.png",
    ResoureName: 'Property',
    ResourceRecordKey: Listings[2].ListingKey
  },
  {
    MediaKey: 4,
    ShortDescription: "Media 4",
    MediaURL: "https://yolo.com/4.png",
    ResoureName: 'Property',
    ResourceRecordKey: Listings[2].ListingKey
  },
  {
    MediaKey: 5,
    ShortDescription: "Media 5",
    MediaURL: "https://yolo.com/5.png",
    ResoureName: 'Property',
    ResourceRecordKey: Listings[4].ListingKey
  },
  {
    MediaKey: 6,
    ShortDescription: "Media 6",
    MediaURL: "https://yolo.com/6.png",
    ResoureName: 'Property',
    ResourceRecordKey: Listings[5].ListingKey
  },
  {
    MediaKey: 7,
    ShortDescription: "Media 7",
    MediaURL: "https://yolo.com/7.png",
    ResoureName: 'Property',
    ResourceRecordKey: Listings[6].ListingKey
  },
  {
    MediaKey: 8,
    ShortDescription: "Media 8",
    MediaURL: "https://yolo.com/8.png",
    ResoureName: 'Property',
    ResourceRecordKey: Listings[3].ListingKey
  },
  {
    MediaKey: 9,
    ShortDescription: "Media 9",
    MediaURL: "https://yolo.com/9.png",
    ResoureName: 'Property',
    ResourceRecordKey: Listings[1].ListingKey
  }
];

const Listings = [
  {
    ListingKey: 1,
    UnparsedAddress: "1 Log Street",
    ListPrice: 123,
    ListAgentKey: Members[3].MemberKey,
    ListOfficeKey: Offices[0].OfficeKey
  },
  {
    ListingKey: 2,
    UnparsedAddress: "2 Log Street",
    ListPrice: 234,
    ListAgentKey: Members[1].MemberKey,
    ListOfficeKey: Offices[1].OfficeKey
  },
  {
    ListingKey: 3,
    UnparsedAddress: "3 Log Street",
    ListPrice: 345,
    ListAgentKey: Members[0].MemberKey,
    ListOfficeKey: Offices[2].OfficeKey
  },
  {
    ListingKey: 4,
    UnparsedAddress: "4 Log Street",
    ListPrice: 456,
    ListAgentKey: Members[2].MemberKey,
    ListOfficeKey: Offices[3].OfficeKey
  },
  {
    ListingKey: 5,
    UnparsedAddress: "5 Log Street",
    ListPrice: 567,
    ListAgentKey: Members[4].MemberKey,
    ListOfficeKey: Offices[4].OfficeKey
  },
  {
    ListingKey: 6,
    UnparsedAddress: "6 Log Street",
    ListPrice: 678,
    ListAgentKey: Members[6].MemberKey,
    ListOfficeKey: Offices[5].OfficeKey
  },
  {
    ListingKey: 7,
    UnparsedAddress: "7 Log Street",
    ListPrice: 789,
    ListAgentKey: Members[5].MemberKey,
    ListOfficeKey: Offices[6].OfficeKey
  }
];

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
