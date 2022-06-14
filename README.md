## REST API Challenge 1

### **Create a rest API in order to manage users & their websites.**

#### **Users**

```javascript
const user = { id, name, email, password, role, createdAt };

const role = "basic" | "advanced";
```

##### **Endpoints**

`Register User`, `Login User`

<br>

##### **Authentication & Authorization**

Users must be authenticated through JWT access tokens.

<br>

#### **Websites**

##### **Endpoints**

`Create website`, `Update website`, `Get website by id`, `Get all websites`, `Delete website`

\*_All website related endpoints will require an authenticated user._

_\*A **basic** role user can only **read/write** their own websites._

\*An **advanced** role user can **read/write** all websites.

```javascript
const website = { id, name, domain, createdAt };
```

<br>

#### **Tools:**

NodeJS, ExpressJS, Docker, Postgresql (postgresjs, knex), JWT (jsonwebtoken), Jest, Supertest

<br>

## **Docker**

`docker images`  
`docker ps` = show all active containers  
`docker ps -a` = show all containers  
`docker logs -f <containerId>` = follow logs inside container (good for node)

`docker stop, start, restart`

`docker exec -it <containerId> bin/bash sau sh`

<br>

## **Docker Compose**

`docker-compose up, down -d `(detach)  
`docker-compose up --build -d` check if anything has changed and if it has it is going to build it  
`docker volume ls ` to see the persisted data from the db

<br>

## **Postgres shortcuts**

- start postgres from container (after exec) `psql -U postgres`

<br>

### **MySQL equivalents in Postgres**

show database = `\l`

use database = `\c`

show tables = `\d`

show views = `\dv`

describe table = `\d :tableName`
