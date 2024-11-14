# Builder
FROM node:20.15.1-alpine AS builder

WORKDIR /build

COPY package.json yarn.lock ./

RUN yarn install --production=true --frozen-lockfile

COPY nest-cli.json tsconfig.json tsconfig.build.json ./

COPY src ./src

RUN yarn build

# Production
FROM node:20.15.1-alpine

RUN addgroup -S app \
    && adduser -S app -G app

WORKDIR /app

COPY --from=builder /build/node_modules ./node_modules

COPY --from=builder /build/dist dist

USER app

CMD node dist/main.js
