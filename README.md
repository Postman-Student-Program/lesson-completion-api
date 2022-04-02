# Postman Lesson Completion API

For completing Skilljar lessons from Postman, optionally running Postman tests against submitted collection URLs.

## Development

### Prereqs

You will need to have [Postgres](https://www.postgresql.org/) installed to run test and development databases.

Once Postgres is install, you should have access to the `psql` command.

### Initialize database

Run

`npm run db:init`

`npm run db:dev:pristine`

This will create `lesson_comp_api_test` and `lesson_comp_api_dev` databases with a user named
`lesson_comp_dev`, then migrate & seed them with initial books.

#### Run migrations

When you initialized the database you ran `npm run db:dev:pristine`, which ran the latest migration.

If you need to update migrations later:

`npm run db:dev:latest`

#### Inspecting database

If you want to poke around the dev database or run SQL commands on it directly, run `npm run psql` in your terminal. This will enter you in the postgres CLI as the default superuser on your machine (hopefully).

You can run SQL queries in the `psql` REPL

### Install and develop

First copy the env vars to your local:

`cp .env.example .env`

You can use the default API Key key and value or modify it.

`npm install`

Start api dev server

`npm run dev`

The API runs on `localhost:4000` by default unless other `PORT` is specified in the environment.

### Testing services

Tests will be ignored in the build, so you can put them anywhere with extension `.test.ts`.

Run `npm test` to start test runner. Note that the test database is destoryed and re-migrated and seeded each run of `npm test`.

Run `npm test:watch` to run tests and continually test as code is updated.

## Env vars and schema

`.env` and `schema.yaml` need to be copied to dist folder. If you update .env or schema in prod, be sure to run `npm run build` again. This will copy over the .env files
