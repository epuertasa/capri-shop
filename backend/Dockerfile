FROM node:24-alpine

WORKDIR /app

# Install dependencies first (layer cache)
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy source
COPY src/ ./src/

EXPOSE 4000

ENV NODE_ENV=production

CMD ["node", "src/index.js"]
