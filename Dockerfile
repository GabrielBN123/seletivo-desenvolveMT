## Multi-stage: build com Node + serve com Nginx

# 1) Build
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# 2) Serve
FROM nginx:alpine

# Remover config padrão e usar a nossa
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Copiar a build gerada para a pasta pública do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
