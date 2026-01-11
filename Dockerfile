# syntax=docker/dockerfile:1

FROM node:20.9.0-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:20.9.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

RUN yarn install --frozen-lockfile --production

EXPOSE 4173
CMD ["node_modules/.bin/http-server", "./dist", "-p", "4173"]
