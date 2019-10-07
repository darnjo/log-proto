# Producer App
 
To run the Producer App, ensure that Docker and docker-compose are installed, then type:
```
    $ docker-compose up
 ``` 

in the root of the `/producer` directory.

This will launch the following containers:
* logProtoProducerApi
* logProtoProducerMongo
* logProtoProducerMongoExpress (Mongo Admin UI)
* logProtoProducerWeb (TODO)

You will see the combined log output from each of these services when running them in `docker-compose`. 

To stop the servers, press `<ctrl+c>` while they are running, or from another terminal type the command: `$ docker-compose down`.
 
