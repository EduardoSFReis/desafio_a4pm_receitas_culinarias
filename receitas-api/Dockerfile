FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache openssl ca-certificates python3 make g++

RUN corepack enable


ENV PRISMA_CLI_BINARY_TARGETS=linux-musl-openssl-3.0.x

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

COPY . .
RUN yarn prisma generate && yarn build

ENV NODE_ENV=production
RUN rm -rf node_modules && yarn install --frozen-lockfile --production

EXPOSE 3000
CMD ["yarn", "start"]
