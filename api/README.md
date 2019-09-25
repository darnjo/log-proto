# There are two ways to run the API Server...

# Option 1: Local Node

## Ensure that npm and yarn are installed

* npm - https://www.npmjs.com/get-npm
* yarn - https://yarnpkg.com/lang/en/docs/install/

## Install packages
The first time you run the app, you'll have to install packages. The application uses `yarn`, so you can use the `yarn install` command. You should do this whenever the `package.json` file changes.

## Start the Server
After packages have been installed, type:

```node app.js```

in the root of the `/api` directory to start the server. 

## Event Generation
There's an event generation process which starts upon initialization of the server. During this process, `DEFAULT_POOL_SIZE` events are generated (see `/data.js`, current default is 10^5 events per resource). 

There is a progress meter that shows how far along one is in the generation process with an ETA. Once events are generated, a sample resource data point is chosen from each resource and displayed so the generated data may be viewed. 

Output will be similar to the following:

```$ node app.js

Event generation started. Pool size is 100000 events for each resource.
 ████████████████████████████████████████ 100% | ETA: 0s | 500000/500000
Event generation complete.

Sample data:
	Office: http://localhost:3000/Office/2176814219342215
	Member: http://localhost:3000/Member/8658654816125143
	Property: http://localhost:3000/Property/1810338110164523
	Media: http://localhost:3000/Media/2102438317020635
	OpenHouse: http://localhost:3000/OpenHouse/7785875554499261

Log Prototype listening on 3000!
```

Event generation not only constructs the event log, but also creates related resources with randomized data that can be accessed from the URL for each data point.

## Other Endpoints

See `app.js` for the endpoints that are exposed. At the time of writing, the current set is:

* `GET /events` - gets all events that have been generated. The response can be quite large.

* `GET /events/gte/:entityEventSequence` - retrieves all events greater than or equal to `:entityEventSequence`. For instance, if the current log entry is 49 and a new event has been created, the consumer would request `http://localhost:3000/events/gte/50` in order to retrieve events later than most recent log entry.

* `GET /genEvents/:numEvents - generates `numEvents` more items in the log. Displays a counter with ETA on the server upon completion.curl -i  http://localhost:3000/genEvents/10000
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 2
ETag: W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"
Date: Wed, 25 Sep 2019 11:54:21 GMT
Connection: keep-alive



* `GET /:resource/:id` - fetches data for a given resourceName and resourceRecordKey (id). 

For example, going to the following Url: `http://localhost:3000/Property/1810338110164523` results in a response of:

```
{"listingKey":1810338110164523,"unparsedAddress":"6860 Hartmann Fort, Wilfred Estates","listPrice":"535.00","listAgentKey":5869937168380625,"listOfficeKey":931235656736843}
```

Note that each of the keys in the response should also be reachable from their respective endpoints. 

`http://localhost:3000/Member/5869937168380625` returns resource data for `listAgentKey: 5869937168380625` through `Member`: 
```
{"memberKey":5869937168380625,"memberFirstName":"Casper","memberLastName":"Purdy","officeKey":7488317500604925}
```

`http://localhost:3000/Office/931235656736843` returns resource data for `listOfficeKey: 931235656736843` through `Office`:
```
{"officeKey":931235656736843,"officeName":"Volkman Inc"}
```

It's worth mentioning that your particular data will be different as data are randomly generated. 


## Coming Soon
* Random append events API endpoint
* Serialization and resuming from a file
* Update API with Schema Validation

# Option 2: Docker

You may also run the app inside of a docker container. At the time of writing, the progress bar doesn't output properly inside of a docker container, but the event generation links for each resource are valid and the API works correctly. This is suitable for a deployment scenario more than local development at the present time.

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
    curl localhost:3000/events

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


