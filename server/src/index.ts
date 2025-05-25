/**
 * Bootstrapped using offical docs https://www.graphql-js.org/docs/running-an-express-graphql-server/
 */
import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';
import cors from 'cors';

import { ruruHTML } from 'ruru/server';

import schema from './graphql/schema';
import * as resolvers from './graphql/resolvers';

const app = express();
app.use(cors());

app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue: resolvers,
  })
);

// Start the server at port
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
