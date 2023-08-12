# Latest Node Version
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

VOLUME [ "/usr/src/app/node_modules" ]

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]