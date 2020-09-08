FROM node:12-slim

# Location in the image for the app code.
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY dist ./dist

ENV PORT 80

CMD [ "node", "dist/apps/server/main.js" ]

EXPOSE 80/tcp
