#Installing puppeteer official image
# FROM ghcr.io/puppeteer/puppeteer:latest

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable


# Use an official Node.js runtime as a parent image
FROM node:20

# Install global dependencies
RUN npm install -g nodemon concurrently

# Setup the working directory for the server
WORKDIR /usr/src/app/server

# Copy server's package.json and install server dependencies
COPY server/package*.json ./
RUN npm install

# Copy the server source code
COPY server/ .

# Setup the working directory for the client
WORKDIR /usr/src/app/client

# Copy client's package.json and install client dependencies
COPY client/ ./
RUN npm install

WORKDIR /usr/src/app

COPY package*.json ./

# Download needed server libraries
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Build the client
RUN npm run build

# Expose port (adjust if your server uses a different port)
EXPOSE 3000

# Command to run the server
CMD ["npm", "start"]