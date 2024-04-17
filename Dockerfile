# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Install global dependencies
RUN npm install -g nodemon concurrently

# Install Puppeteer and other dependencies for server runtime
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libdrm2 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

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
