#!/bin/bash
if [ "$NODE_ENV" == "local" ] ; then 
    # dev command
    echo "docker-entry.sh running pm2 start"
    yarn global add pm2
    pm2 start ./dev/env/local.yaml && bash;
else
    # production command
    echo "docker-entry.sh running npm start"
    npm start
fi

