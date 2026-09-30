# ==========================================
# Multi-Stage Dockerfile for Portfolio Stack
# Target 1: backend  (Node.js Express + SQLite API)
# Target 2: frontend (Vite React static app on Nginx)
# ==========================================

# ------------------------------------------
# Stage 1: Base Node environment with build essentials for native modules
# ------------------------------------------
FROM node:22-slim AS base
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ------------------------------------------
# Stage 2: Backend Microservice (Express + SQLite)
# ------------------------------------------
FROM base AS backend
WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy server code
COPY server/ ./server/

# Create persistent data directory for SQLite database
RUN mkdir -p /app/data

# Environment configuration
ENV NODE_ENV=production \
    PORT=5001 \
    DB_PATH=/app/data/portfolio.db

EXPOSE 5001

# Health check using Node.js built-in fetch
HEALTHCHECK --interval=15s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:' + (process.env.PORT || 5001) + '/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server/index.js"]

# ------------------------------------------
# Stage 3: Frontend Build Stage
# ------------------------------------------
FROM base AS frontend-builder
WORKDIR /app

# Install all dependencies (including devDependencies needed for Vite)
COPY package*.json ./
RUN npm ci

# Copy frontend source files
COPY index.html vite.config.js ./
COPY public/ ./public/
COPY src/ ./src/

# Set root base path for Docker container deployment
ARG VITE_BASE_PATH=/
ENV VITE_BASE_PATH=${VITE_BASE_PATH}

# Build static production bundle
RUN npm run build

# ------------------------------------------
# Stage 4: Production Frontend (Nginx Reverse Proxy & Web Server)
# ------------------------------------------
FROM nginx:alpine AS frontend
WORKDIR /usr/share/nginx/html

# Clean default nginx files
RUN rm -rf ./*

# Copy built production assets from builder
COPY --from=frontend-builder /app/dist ./

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Health check for Nginx web server
HEALTHCHECK --interval=15s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
