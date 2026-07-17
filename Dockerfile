# Stage 1: Build React Frontend and Express Backend
FROM node:20 AS builder

WORKDIR /app

# Copy the whole project
COPY . .

# Build frontend
RUN npm install
RUN npm run build

# Build backend
WORKDIR /app/server
RUN npm install
RUN npm run build

# Stage 2: Serve
FROM node:20

WORKDIR /app

# Copy frontend build
COPY --from=builder /app/dist ./dist

# Copy backend build and dependencies
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/package*.json ./server/
COPY --from=builder /app/server/node_modules ./server/node_modules

# Ensure uploads folder exists
RUN mkdir -p /app/server/uploads

WORKDIR /app/server

EXPOSE 5000

CMD ["npm", "start"]
