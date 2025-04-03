# Use Node.js 22 with Chromium pre-installed
FROM node:22-bullseye

# Install Chrome dependencies
RUN apt-get update && \
    apt-get install -y \
    chromium \
    fonts-liberation \
    libgbm1 \
    libxss1 \
    && rm -rf /var/lib/apt/lists/*

# Environment variables for Puppeteer/WhatsApp-Web.js
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV DISPLAY=:99

# Create and set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock ./

# Install production dependencies
RUN yarn install --production

# Copy all source files
COPY . .

# Ensure session directories exist
RUN mkdir -p .wwebjs_auth .wwebjs_cache

# Fix your start script (remove "npm" from the command)
CMD ["node", "./index.js"]

# Expose your API port
EXPOSE 3000
