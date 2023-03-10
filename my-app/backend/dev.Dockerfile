FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install -g ts-node
RUN npm install -g ts-node-dev

CMD ["npm", "run", "dev"]