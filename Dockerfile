FROM node:12-alpine
WORKDIR /booking-service
COPY . .
RUN npm install --production
CMD ["node", "server/index.js"]