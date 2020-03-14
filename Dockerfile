FROM node:13.10.1-slim
MAINTAINER https://github.com/cprieger/
# Give us a dir in case we need to find this later.
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# node_modules, docs, tests will be skipped via .dockerignore
COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 1337
CMD [ "node", "server.js"]

