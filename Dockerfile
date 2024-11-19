# Builder
FROM node:20.15.1-alpine AS builder

ARG APPLICATION

WORKDIR /build

COPY package.json yarn.lock ./

RUN yarn install --production=true --frozen-lockfile

COPY nest-cli.json tsconfig.json tsconfig.build.json webpack.config.js .swcrc ./

COPY apps ./apps

COPY libs ./libs

RUN yarn build $APPLICATION

# Production
FROM node:20.15.1-alpine

ARG APPLICATION

RUN addgroup -S app \
    && adduser -S app -G app

WORKDIR /app

COPY ./proto ./proto

COPY --from=builder /build/node_modules ./node_modules

COPY --from=builder /build/dist/apps/$APPLICATION dist/apps/app

USER app

CMD node dist/apps/app/main.js
