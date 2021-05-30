# --------------> The build image
FROM node:latest AS build
WORKDIR /usr/src/app
COPY src /usr/src/app/src
COPY public /usr/src/app/public
COPY package.json /usr/src/app/
COPY tsconfig.json /usr/src/app/
RUN yarn global add typescript
RUN yarn install
RUN yarn build

# --------------> The production image
FROM caddy:2.4.0-alpine
COPY --from=build /usr/src/app/build/ /usr/share/caddy/
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]