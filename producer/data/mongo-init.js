db.createUser(
  {
    user: 'log',
    pwd: 'proto',
    roles: [
      {
        role: 'readWrite',
        db: 'logProtoProducer',
      }
    ]
  }
);
