FROM node:19-alpine

COPY . .
WORKDIR /home/node/app

RUN npm install

EXPOSE 3000
