ARG NODE_VERSION=14

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/srv/client

COPY client .

RUN yarn

CMD ["yarn", "start"]

