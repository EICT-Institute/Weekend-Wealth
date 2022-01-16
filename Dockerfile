FROM node:14.18.2-alpine3.13
# Create app directory
WORKDIR /usr/src/app

ENV SERVER_PORT=8080

# Install app dependencies
COPY package*.json ./

RUN npm install
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3030
CMD [ "npm", "start" ]
