FROM node:14-alpine

EXPOSE 3000
ENV PORT=3000
WORKDIR /app

ENV NODE_ENV production
ENV AWS_DEFAULT_REGION eu-west-1

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]

COPY . /app
RUN yarn install
