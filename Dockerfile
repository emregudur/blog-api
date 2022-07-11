FROM node:16.16.0-slim
WORKDIR /opt/blog-api

COPY ./dist-server ./dist-server
COPY ./package.json ./package.json
COPY ./.env ./.env


RUN yarn install --frozen-lockfile

ENV NODE_ENV production
ENV PORT 3010

EXPOSE 3010

CMD ["yarn", "server"]