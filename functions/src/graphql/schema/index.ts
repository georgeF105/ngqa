import { makeExecutableSchema } from 'graphql-tools';

import resolvers from '../data/resolvers';
import { GraphQLSchema } from 'graphql';

const typeDefs = `
type Question {
  key: String!
  title: String!
  body: String
  user: User
  votes: Int
  answers: [Answer]
}
type Answer {
  key: String!
  body: String
  user: User
  votes: Int
}
type User {
  key: String!
  name: String
  email: String
}
input AnswerInput {
  body: String!
  user: String!
}
# the schema allows the following query:
type Query {
  questions: [Question]
  question(id: String!): Question
}
# this schema allows the following mutation:
type Mutation {
  upvoteAnswer (
    answerId: String!
  ): Answer
  answerQuestion (
    questionKey: String!,
    answer: AnswerInput!
  ): Question
}
`;

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});
