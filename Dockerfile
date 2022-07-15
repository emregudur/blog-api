FROM node:16.16.0-slim
WORKDIR /opt/blog-api

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

ENV NODE_ENV production
ENV PORT 3010

EXPOSE 3010

CMD ["yarn", "server"]