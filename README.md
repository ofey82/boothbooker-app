# Eventu.io

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setting Up Environment Variables](#setting-up-environment-variables)
- [Running the PostgreSQL Database](#running-the-postgresql-database)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Angular CLI](https://angular.io/cli)

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/ildefonso-nuno/boothbooker-app.git
cd boothbooker-app
```

## Setting Up Environment Variables

Setting Up Environment Variables
Create a .env file in the root of the backend directory (server/) and add the following environment variable:

DATABASE_URL="postgresql://<DB_USER>:<DB_PASSWORD>@localhost:5432/eventu-db"

Substitute the DB_USER and DB_PASSWORD by a user and password of your choice

## Creating the Docker Compose File

Create a docker-compose.yml file in the root of your project directory and add the following content:

```bash
version: '3.8'

services:
  db:
    image: postgres:latest
    container_name: boothbooker-pg
    environment:
      POSTGRES_DB: boothbooker-db
      POSTGRES_USER: <DB_USER>
      POSTGRES_PASSWORD: <DB_PASSWORD>
      PGDATA: /var/lib/postgresql/data/pgdata
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Don´t forget to substitute the user and pass of db.

## Running the PostgreSQL Database

Navigate to the root of your project where you created the docker-compose.yml file and run the following command to start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

This will start the PostgreSQL database in a Docker container.

## Running the Backend

Navigate to the backend directory and install the dependencies:

```bash
cd server
npm install
```

Compile the TypeScript code:

```bash
npx tsc
```

Run prisma:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Start the Express server:

```bash
node dist/src/index.js
```

The backend should now be running on http://localhost:3000.

## Running the Frontend

Navigate to the frontend directory and install the dependencies:

```bash
cd client
npm install
```

Start the Angular development server:

```bash
ng serve
```

The frontend should now be running on http://localhost:4200.
