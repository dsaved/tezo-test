# Use NodeJS base image
FROM node:13.14.0
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm ci
# Copy app source
COPY . .
# build the nest application
RUN npm run build
# Bind the port that the image will run on
EXPOSE 8100
# Define the Docker image's behavior at runtime
CMD ["npm","run", "start:prod"]
