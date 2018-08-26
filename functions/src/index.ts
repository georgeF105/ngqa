import * as functions from 'firebase-functions';

import setupGraphQLServer from './graphql';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send('Hello from Firebase!');
});


const graphQLServer = setupGraphQLServer();

// https://us-central1-<project-name>.cloudfunctions.net/api
export const api = functions.https.onRequest(graphQLServer);
