FROM node:19-alpine

COPY . .
WORKDIR /home/node/app
RUN npm i -g @nestjs/cli
RUN npm install


# RUN chmod -R 777 .

EXPOSE 3000
