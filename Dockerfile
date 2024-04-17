# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Install global dependencies
RUN npm install -g nodemon concurrently

# Install Puppeteer and other dependencies for server runtime
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
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

# Run everything after as non-privileged user.
USER pptruser

# Command to run the server
CMD ["npm", "start"]
