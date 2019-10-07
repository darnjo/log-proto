# Consumer App
 
To run the Consumer App, ensure that Docker and docker-compose are installed, then type:
```
    $ docker-compose up
 ``` 

in the root of the `/consumer` directory.

This will launch the following containers:
* logProtoConsumerApi
* logProtoConsumerMongo
* logProtoConsumerMongoExpress (Mongo Admin UI)
* logProtoConsumerWeb (TODO)

You will see the combined log output from each of these services when running them in `docker-compose`. 

To stop the servers, press `<ctrl+c>` while they are running, or from another terminal type the command: `$docker-compose down`.
 
