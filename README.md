## Setup

### 1. Installation

```jsx
yarn install 
```
```jsx
npm install
```

# development

```jsx
yarn watch:dev
```

# production

```
yarn prod
```


## env file
```jsx
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD='<SECRET>'
MONGO_USERNAME=root
MONGO_PASSWORD='<SECRET>'
MONGO_HOST=localhost
MONGO_DBNAME=blogdb
MONGO_PORT=27017
JWT_SECRET_KEY='<SECRET>'
API_KEY='<SECRET>'
PORT=3040
```

# Docker

## Docker compose

```diff
version: "3.4"

+services:
+    blogdb:
+        container_name: blogdb
+        image: mongo
+        restart: on-failure
+        ports:
+            - 27017:27017
+        volumes:
+         - /mongodata:/data/db
+        networks:
+            - blog
+        environment:
+            MONGO_INITDB_ROOT_USERNAME: "${MONGO_INITDB_ROOT_USERNAME}"
+            MONGO_INITDB_ROOT_PASSWORD: "${MONGO_INITDB_ROOT_PASSWORD}"
+            MONGO_INITDB_DATABASE: "${MONGO_DBNAME}"
+    blogapi:
+        build: ./blog-api
+        container_name: blogapi
+        ports:
+            - 3000:3040
+        restart: on-failure
+        depends_on:
+            - blogdb
+        networks:
+            - blog
+        environment:
+            MONGO_USERNAME: "${MONGO_USERNAME}"
+            MONGO_PASSWORD: "${MONGO_PASSWORD}"
+            MONGO_HOST: "${MONGO_HOST}"
+            MONGO_DBNAME: "${MONGO_DBNAME}"
+            MONGO_PORT: "${MONGO_PORT}"
+            JWT_SECRET_KEY: "${JWT_SECRET_KEY}"
    blogweb:
        build: ./blog
        container_name: blogweb
        ports:
            - 8000:8000
        networks:
            - blog
+volumes:
+    mongodata:

+networks:
+  blog:
+    driver: bridge
```

## docker compose build and run

```jsx
docker-compose up -d blogdb &&
docker-compose build blogapi &&
docker-compose up -d blogapi
```
