## Build Image
docker image build -t auth-nodejs .

## Release
docker login
docker tag auth-nodejs:latest sarhan/auth-nodejs
Docker push sarhan/auth-nodejs:latest

## Launch
docker-compose up
