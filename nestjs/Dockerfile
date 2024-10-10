FROM node:22.9.0-alpine3.20 as base
LABEL maintainer="Mathis Gasparotto <mathis.gasparotto@hotmail.com>"

FROM base as dependencies

WORKDIR /app

COPY --link package.json yarn.lock ./
RUN yarn install --non-interactive

COPY --link . .

# RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:dev"]