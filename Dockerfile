#Installing puppeteer official image
FROM ghcr.io/puppeteer/puppeteer:latest

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable


# Use an official Node.js runtime as a parent image
FROM node:20

# Install global dependencies
RUN npm install -g nodemon concurrently

# Download needed server libraries
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 dbus dbus-x11\
      --no-install-recommends \
    && service dbus start \
    && rm -rf /var/lib/apt/lists/*

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

# Build the client
RUN npm run build

# Switch back to server directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN  mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /node_modules \
    && chown -R pptruser:pptruser /package.json \
    && chown -R pptruser:pptruser /package-lock.json

# Run everything after as non-privileged user.
USER pptruser
      

# Expose port (adjust if your server uses a different port)
EXPOSE 3000

# Command to run the server
CMD ["google-chrome-stable","npm", "start"]