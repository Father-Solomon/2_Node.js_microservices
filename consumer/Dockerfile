# Dockerfile for Microservice 2 (Consumer)
FROM node:latest

WORKDIR /app

COPY package.json .
RUN  npm run
RUN npm install
ENV ENV_VARIABLE_NAME_1=value1
COPY . .

CMD ["npm", "start"]
