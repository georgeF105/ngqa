import { makeExecutableSchema } from 'graphql-tools';

import resolvers from '../data/resolvers';

const schema = `
type Question {
  key: String!
  body: String!
  user: User
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
# the schema allows the following query:
type Query {
  questions: [Question]
  question(id: String!): Question
}
# this schema allows the following mutation:
type Mutation {
  upvoteAnswer (
    answerId: Int!
  ): Answer
  answerQuestion (
    questionId: String!,
    answer: String
  ): Answer
}
`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers
});
