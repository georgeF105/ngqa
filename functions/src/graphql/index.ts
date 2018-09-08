import * as bodyParser from 'body-parser';
import * as express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { schema } from './schema';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import { config } from 'firebase-functions';
import * as cors from 'cors';

export const setupGraphQLServer = (): express.Express => {
  // setup server
  const graphQLServer = express();
  graphQLServer.use(cors());
  // /api/graphql
  graphQLServer.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({ schema, context: {} })
  );

  const prodMode = config().firebase;
  const endpointURL = prodMode
    ? '/api/graphql'
    : '/ngqa-bad8d/us-central1/api/graphql';

  // /api/graphiql
  graphQLServer.use(
    '/graphiql',
    graphiqlExpress({ endpointURL })
  );

  // /api/schema
  graphQLServer.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(printSchema(schema));
  });

  return graphQLServer;
};
