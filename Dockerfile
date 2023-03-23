FROM node:18-alpine as builder

WORKDIR /app
COPY . /app

RUN npm i && npm run build:all

FROM denoland/deno:alpine-1.30.0 as prod

ARG UID
ARG GID
ARG PORT

ENV UID=${UID:-1010}
ENV GID=${GID:-1010}
ENV PORT=${PORT:-3000}

RUN addgroup -g ${GID} --system meting \
    && adduser -G meting --system -D -s /bin/sh -u ${UID} meting

COPY --from=0 /app/dist/deno.js /app/dist/deno.js
RUN deno cache /app/dist/deno.js

RUN chown -R meting:meting /app
USER meting

EXPOSE ${PORT}

CMD deno run --allow-net --allow-env /app/dist/deno.js
