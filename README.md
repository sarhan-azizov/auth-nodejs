## Build Image
docker image build -t auth-nodejs:1.0 .

## Release
docker login
docker tag auth-node:1.0 sarhan/auth-nodejs:1.0
Docker push sarhan/auth-nodejs:1.0
