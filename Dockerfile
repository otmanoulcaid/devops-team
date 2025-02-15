FROM debian:stable-slim

RUN apt update && apt install npm -y

WORKDIR /app

RUN npm install vite

COPY app/ ./

EXPOSE 5173

ENTRYPOINT ["npm", "run", "dev"]
