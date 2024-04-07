FROM node:latest AS frontend

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM mongo:latest AS backend

WORKDIR /usr/src/app

COPY --from=frontend /usr/src/app/build /usr/src/app/build

EXPOSE 3000
EXPOSE 27017

CMD ["mongod"]
