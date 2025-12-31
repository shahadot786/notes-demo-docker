# Stage 1

FROM node:22 as runner

WORKDIR /app

COPY package*.json .
RUN npm install

COPY src/ src/

EXPOSE 8000

CMD ["npm", "start"]

