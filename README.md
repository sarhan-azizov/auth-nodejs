## Build Image
docker image build -t auth-nodejs .

## Release
docker login
docker tag auth-nodejs:latest sarhan/auth-nodejs
Docker push sarhan/auth-nodejs:latest

## Launch
docker-compose up


## Helpers

#### Containers
#delete all containers
docker rm -f $(docker ps -a -q) 
Docker ps -a

docker run -it --rm --net=sarhan-network image
docker exec -it containerId bash

### Images
#delete all containers 
docker rmi -f $(docker images -q)
Docker images

docker system prune

docker exec -it IMAGE_ID /bin/sh
Docker images


## Docker 
https://dev.to/jay97/docker-compose-an-express-and-mongo-app-aai
https://dev.to/aduranil/10-docker-compose-and-docker-commands-that-are-useful-for-active-development-22f9

## Mongo
https://dzone.com/articles/top-10-most-common-commands-for-beginners
https://tecadmin.net/backup-and-restore-mongodb-database/


Backup
mongodump -d auth --collection Users -o .
