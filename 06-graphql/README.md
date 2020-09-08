# Node-Typescript case study: GraphQL with Postgraphile

If you do not have Postgres 9.6.0+ installed or do not have a database, follow
instructions in sections 'Install PostgreSQL' and 'Create a Database':

https://www.graphile.org/postgraphile/quick-start-guide/#install-postgresql

- Update the environment variables in `.env` if they are different from the defaults

- Run `npm install`

- Set up the database in a Bash terminal:

  `. .env`

  `npm run generate-schema`

  `npm run generate-data`

- Finally run `yarn dev` the serve the app, and visit [localhost:3000/graphiql](http://localhost:3000/graphiql) (use the port specified in `.env` if it's different)
