import * as bodyParser from 'body-parser';
import * as express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema';
import { printSchema } from 'graphql/utilities/schemaPrinter';

const setupGraphQLServer = () => {
  // setup server
  const graphQLServer = express();

  // /api/graphql
  graphQLServer.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({ schema, context: {} })
  );

  const endpointURL = true
    ? '/ngqa-bad8d/us-central1/api/graphql'
    : '/api/graphql';

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

export default setupGraphQLServer;
