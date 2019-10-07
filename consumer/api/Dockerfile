FROM node:12

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --silent
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "node", "app.js" ]
