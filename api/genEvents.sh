#/bin/bash

#in order to run this, add something similar to the following (every minute)
#job to your crontab with crontab -e
#  * * * * *  /your/local/project/path/log-proto/api/genEvents.sh
curl -X POST  http://localhost:3000/genEvents/10000
