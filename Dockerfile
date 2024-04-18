# Use an official Node.js runtime as a parent image
#FROM node:18-slim

FROM ghcr.io/puppeteer/puppeteer:22.0.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

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

# Build the client
RUN npm run build

# Switch back to server directory
WORKDIR /usr/src/app

COPY package*.json ./

# Expose port (adjust if your server uses a different port)
EXPOSE 3000

# Command to run the server
CMD ["npm", "start"]