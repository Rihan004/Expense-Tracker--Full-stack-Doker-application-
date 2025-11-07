# --- Frontend Dockerfile ---

# Step 1: Build the React (Vite) app
FROM node:18 AS build

WORKDIR /app

# Copy package.json & package-lock.json first for better caching
COPY package*.json ./
RUN npm install

# Copy rest of the source code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve using Nginx
FROM nginx:alpine

# Copy the build output to Nginx's default public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Replace default Nginx config (for React Router SPA support)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

