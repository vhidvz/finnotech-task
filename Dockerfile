FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Build
FROM build

COPY . .

CMD npm run build && npm run start:prod
