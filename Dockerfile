FROM node:20.17 

WORKDIR /opt/amicci

RUN npm i -g serve

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

ENTRYPOINT [ "serve" ]
CMD [ "build" ]
