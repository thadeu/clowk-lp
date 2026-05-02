FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM oven/bun:alpine
WORKDIR /app
RUN apk add vim bash
COPY --from=build /app/out ./out
EXPOSE 80