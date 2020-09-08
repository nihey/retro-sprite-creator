FROM node:10-buster

WORKDIR /var/www

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci --only=production

COPY . .

EXPOSE 4040

CMD [ "npm", "run", "server" ]
