# Builder
FROM node:20.15.1-alpine AS builder

WORKDIR /build

COPY package.json yarn.lock ./

RUN yarn install --production=true --frozen-lockfile

COPY nest-cli.json tsconfig.json tsconfig.build.json ./

COPY apps ./apps

COPY libs ./libs

RUN yarn build $APP

# Production
FROM node:20.15.1-alpine

RUN addgroup -S app \
    && adduser -S app -G app

WORKDIR /app

COPY --from=builder /build/node_modules ./node_modules

COPY --from=builder /build/dist/apps/$APP dist

USER app

CMD node dist/main.js
