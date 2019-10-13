FROM node:latest
RUN mkdir -p /build
WORKDIR /build
COPY package.json /build
RUN npm install
COPY . /build
EXPOSE 3000
CMD [ "npm", "start" ]
