FROM node:18-alpine

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies and clean cache in SAME layer
RUN npm install && npm cache clean --force

# Copy rest of the app
COPY . .

# Expose React port
EXPOSE 3000

CMD ["npm", "start"]