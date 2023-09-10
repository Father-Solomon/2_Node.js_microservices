# Dockerfile for Microservice 1 (Producer)
FROM node:18-alpine

WORKDIR /app

COPY .package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]


