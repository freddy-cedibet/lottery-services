# Stage 1: Building the code
FROM node:16 AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including 'typescript' and 'tsc'
RUN npm install

# Copy the rest of the code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Setup the production environment
FROM node:16

WORKDIR /usr/src/app

# Copy the build from the previous stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Install PM2 globally for process management
RUN npm install pm2 -g

# Your app binds to port 8081 for http and 9876 for admin
EXPOSE 8081 9876

# Run as non-root user
USER node

# Health check script
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD ["node", "dist/healthcheck.js"]

# Start the app
CMD ["pm2-runtime", "start", "dist/server.js"]
