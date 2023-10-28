# Use an official Node runtime as a parent image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json AND package-lock.json
COPY package*.json ./


# Install any needed packages including PM2 globally
RUN npm install && npm install pm2 -g

# Bundle app source inside the Docker image
COPY . .

COPY server.js ./

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 6001

# Use a non-root user for security
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start your app using PM2
CMD ["pm2-runtime", "start", "server.js"]
