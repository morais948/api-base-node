FROM node:16-alpine

WORKDIR /api

COPY . .

RUN yarn

CMD ["yarn", "dev"]
