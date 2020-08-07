FROM node:14

WORKDIR /usr/src/bot

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]
