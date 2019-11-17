[![Build Status](https://travis-ci.org/sarhan-azizov/auth-nodejs.svg?branch=master)](https://travis-ci.org/sarhan-azizov/auth-nodejs) 

TEST
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
delete all containers
sudo docker rm -f $(sudo docker ps -a -q) 
Docker ps -a

docker run -it --rm imageId
docker exec -it containerId bash

### Images
delete all containers 
sudo docker rmi -f $(sudo docker images -q)
docker images

#Purging All Unused or Dangling Images, Containers, Volumes, and Networks
docker system prune
docker volume prune
docker volume rm auth-nodejs_auth-volume
docker volume ls
docker volume inspect auth-nodejs_auth-volume

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
