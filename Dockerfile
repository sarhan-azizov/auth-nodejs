FROM node:latest
RUN mkdir -p app
WORKDIR app
COPY . app
RUN npm install
EXPOSE 5000
CMD [ "npm", "start" ]
