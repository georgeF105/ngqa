import { QuestionDetailsModule } from './question-details.module';

describe('QuestionDetailsModule', () => {
  let questionDetailsModule: QuestionDetailsModule;

  beforeEach(() => {
    questionDetailsModule = new QuestionDetailsModule();
  });

  it('should create an instance', () => {
    expect(questionDetailsModule).toBeTruthy();
  });
});
