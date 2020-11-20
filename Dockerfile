FROM node:14.4.0-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
RUN npm start
