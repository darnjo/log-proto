# To Run API Server...


## [Ensure you're running Docker on your platform](https://docs.docker.com/install/).
## Build the API container

  From the root of the node directory, run the following command:
    ```docker build -t log-proto .```

  When the build finishes, verify it's present using ```docker images```

  Note: the working directory for the app is ```/tmp/log-proto```
  This may be changed in ```./Dockerfile```

## Once the container has been built, run the API server

  If you want to run the API server interactively in the terminal:

    docker run -p 3000:3000 log-proto

  This should produce the following message in the terminal:

    Log Prototype listening on 3000!

  Otherwise, run it as a daemon:

    docker run -p 3000:3000 -d log-proto

  This will start the API server on port 3000. 
  You may change the port by passing the following arguments: ```-p <host>:3000```.
  Subsequent URLs assume port 3000, so adjust accordingly.

## In a new terminal, make a request to the mock events API
    curl -i localhost:3000/events

This should return something similar to the following:

```
  $ curl -i localhost:3000/events

  HTTP/1.1 200 OK
  X-Powered-By: Express
  Content-Type: application/json; charset=utf-8
  Content-Length: 3608
  ETag: W/"e18-Oi0q0Pp3MlKGlAOw08VPr+6a0hw"
  Date: Tue, 17 Sep 2019 09:43:06 GMT
  Connection: keep-alive

  [{"EventSequenceNumeric":1,"ResourceName":"Office","ResourceRecordKeyNumeric":1,"ResourceRecordURL":"http://localhost:3000/Office/1"},{"EventSequenceNumeric":2,"ResourceName":"Member","ResourceRecordKeyNumeric":1,"ResourceRecordURL":"http://localhost:3000/Member/1"},{"EventSequenceNumeric":3,"ResourceName":"Property","ResourceRecordKeyNumeric":1,"ResourceRecordURL":"http://localhost:3000/Property/1"},{"EventSequenceNumeric":4,"ResourceName":"Media","ResourceRecordKeyNumeric":1,"ResourceRecordURL":"http://localhost:3000/Media/1"},{"EventSequenceNumeric":5,"ResourceName":"Media","ResourceRecordKeyNumeric":2,"ResourceRecordURL":"http://localhost:3000/Media/2"},{"EventSequenceNumeric":6,"ResourceName":"Media","ResourceRecordKeyNumeric":3,"ResourceRecordURL":"http://localhost:3000/Media/3"},{"EventSequenceNumeric":7,"ResourceName":"Media","ResourceRecordKeyNumeric":4,"ResourceRecordURL":"http://localhost:3000/Media/4"},{"EventSequenceNumeric":8,"ResourceName":"Media","ResourceRecordKeyNumeric":5,"ResourceRecordURL":"http://localhost:3000/Media/5"},{"EventSequenceNumeric":9,"ResourceName":"Media","ResourceRecordKeyNumeric":6,"ResourceRecordURL":"http://localhost:3000/Media/6"},{"EventSequenceNumeric":10,"ResourceName":"Member","ResourceRecordKeyNumeric":2,"ResourceRecordURL":"http://localhost:3000/Member/2"},{"EventSequenceNumeric":11,"ResourceName":"Member","ResourceRecordKeyNumeric":1,"ResourceRecordURL":"http://localhost:3000/Member/1"},{"EventSequenceNumeric":12,"ResourceName":"Office","ResourceRecordKeyNumeric":2,"ResourceRecordURL":"http://localhost:3000/Office/2"},{"EventSequenceNumeric":13,"ResourceName":"Property","ResourceRecordKeyNumeric":2,"ResourceRecordURL":"http://localhost:3000/Property/2"},{"EventSequenceNumeric":14,"ResourceName":"Property","ResourceRecordKeyNumeric":3,"ResourceRecordURL":"http://localhost:3000/Property/3"},{"EventSequenceNumeric":15,"ResourceName":"Media","ResourceRecordKeyNumeric":7,"ResourceRecordURL":"http://localhost:3000/Media/7"},{"EventSequenceNumeric":16,"ResourceName":"Media","ResourceRecordKeyNumeric":8,"ResourceRecordURL":"http://localhost:3000/Media/8"},{"EventSequenceNumeric":17,"ResourceName":"Media","ResourceRecordKeyNumeric":9,"ResourceRecordURL":"http://localhost:3000/Media/9"},{"EventSequenceNumeric":18,"ResourceName":"Media","ResourceRecordKeyNumeric":3,"ResourceRecordURL":"http://localhost:3000/Media/3"},{"EventSequenceNumeric":19,"ResourceName":"Office","ResourceRecordKeyNumeric":4,"ResourceRecordURL":"http://localhost:3000/Office/4"},{"EventSequenceNumeric":20,"ResourceName":"Office","ResourceRecordKeyNumeric":5,"ResourceRecordURL":"http://localhost:3000/Office/5"},{"EventSequenceNumeric":21,"ResourceName":"Office","ResourceRecordKeyNumeric":6,"ResourceRecordURL":"http://localhost:3000/Office/6"},{"EventSequenceNumeric":22,"ResourceName":"Member","ResourceRecordKeyNumeric":1,"ResourceRecordURL":"http://localhost:3000/Member/1"},{"EventSequenceNumeric":23,"ResourceName":"Member","ResourceRecordKeyNumeric":2,"ResourceRecordURL":"http://localhost:3000/Member/2"},{"EventSequenceNumeric":24,"ResourceName":"Member","ResourceRecordKeyNumeric":3,"ResourceRecordURL":"http://localhost:3000/Member/3"},{"EventSequenceNumeric":25,"ResourceName":"Property","ResourceRecordKeyNumeric":1,"ResourceRecordURL":"http://localhost:3000/Property/1"},{"EventSequenceNumeric":26,"ResourceName":"Property","ResourceRecordKeyNumeric":2,"ResourceRecordURL":"http://localhost:3000/Property/2"},{"EventSequenceNumeric":27,"ResourceName":"Media","ResourceRecordKeyNumeric":2,"ResourceRecordURL":"http://localhost:3000/Media/2"}]
```

  
See the [following guide](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) for further information on dockerizing nodejs apps.


