import { getItem, getList, addItemToList, toList } from './database';

const resolveFunctions = {
  Query: {
    questions() {
      return getList(['questions']);
    },
    question(_, { id }) {
      return getItem(['questions', id]);
    }
  },
  Mutation: {
    upvoteAnswer(_, { answerId }) {
      const dummyAnswers = [];
      const answer = dummyAnswers.find(_answer => _answer.id === answerId);
      if (!answer) {
        throw new Error(`Couldn't find answer with id ${answerId}`);
      }
      answer.votes += 1;
      return answer;
    },
    answerQuestion(_, { questionKey, answer }) {
      return addItemToList(['answers'], answer)
        .then(answerKey => addItemToList(['questions', questionKey, 'answers'], answerKey))
        .then(() => getItem(['questions', questionKey]))
    }
  },
  Question: {
    answers(question) {
      return getList(['answers'])
        .then(answerList => answerList.filter(answer => {
          const answerArray = Object.keys(question.answers).map(key => question.answers[key]);
          return answerArray.includes(answer.key);
        }));
    },
    user(question) {
      return getItem(['users', question.user]);
    }
  },
  Answer: {
    user(answer) {
      return getItem(['users', answer.user]);
    }
  }
};

export default resolveFunctions;
