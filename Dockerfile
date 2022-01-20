FROM node:alpine

WORKDIR /usr/src/app
COPY ./package.json .

RUN npm install
COPY . .

RUN npm run transpile


EXPOSE 4000
CMD [ "npm", "run", "start" ]