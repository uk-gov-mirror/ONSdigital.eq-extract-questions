FROM node:14-alpine

EXPOSE 3050
ENV PORT=3050
WORKDIR /app

ENV NODE_ENV production

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]

COPY . /app
RUN yarn install
