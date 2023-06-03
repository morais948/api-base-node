FROM node:18-alpine

WORKDIR /api

COPY . .

RUN yarn

RUN yarn build