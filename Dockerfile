FROM node:16-alpine

WORKDIR /api

COPY . .

RUN yarn

RUN yarn build

CMD ["yarn", "start"]
