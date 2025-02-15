FROM node:16

WORKDIR /app

RUN npm install vite

COPY app/ ./

EXPOSE 5173

ENTRYPOINT ["npm", "run", "dev"]
