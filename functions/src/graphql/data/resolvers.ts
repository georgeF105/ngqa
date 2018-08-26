const questions = [
  { id: 'abc', question: 'dummy question Tom', answers: ['A'], user: '1' },
  { id: 'xyz', question: 'dummy question Sashko', answers: ['A', 'C'], user: '2' }
];

const answers = [
  { id: 'A', body: 'Introduction to GraphQL', votes: 2, user: '1' },
  { id: 'B', body: 'GraphQL Rocks', votes: 3, user: '2' },
  { id: 'C', body: 'Advanced GraphQL', votes: 1, user: '2' }
];

const users = [
  { id: '1', name: 'user 1', email: 'user_1@gmail.com' },
  { id: '2', name: 'user 2', email: 'user_2@gmail.com' }
];

const resolveFunctions = {
  Query: {
    questions() {
      return questions;
    },
    question(_, { id }) {
      return questions.find(question => question.id === id);
    }
  },
  Mutation: {
    upvoteAnswer(_, { answerId }) {
      const answer = answers.find(_answer => _answer.id === answerId);
      if (!answer) {
        throw new Error(`Couldn't find answer with id ${answerId}`);
      }
      answer.votes += 1;
      return answer;
    }
  },
  Question: {
    answers(question) {
      return answers.filter(answer => question.answers.includes(answer.id));
    },
    user(question) {
      return users.find(user => user.id === question.user);
    }
  },
  Answer: {
    user(answer) {
      return users.find(user => user.id === answer.user);
    }
  }
};

export default resolveFunctions;
