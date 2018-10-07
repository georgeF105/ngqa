import { Component, OnInit } from '@angular/core';
import { Question, Answer } from '@ngqa/models';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, switchMap, take, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserSelectors } from '../../user/user.selectors';

const SUBMIT_ANSWER = gql`
  mutation answerQuestion ($questionKey: String!, $answer: AnswerInput!) {
    answerQuestion (questionKey: $questionKey, answer: $answer) {
      key
      title
      body
      answers {
        key
        body
        user {
          name
        }
        votes
      }
      user {
        name
      }
    }
  }
`;

const QUESTION_QUERY = gql`
  query CurrentQuestion($id: String!) {
  question (id: $id) {
    key
    title
    body
    answers {
      key
      body
      user {
        name
      }
      votes
    }
    user {
      name
    }
  }
}
`;

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {
  public question$: Observable<Question>;
  public answer: string;
  public draftAnswer$: Observable<Answer>;

  constructor(
    private _apollo: Apollo,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<any>
  ) { }

  ngOnInit() {
    this.question$ = this.getQuestion();
    this.draftAnswer$ = this.getDraftAnswer();
  }

  private getQuestion (): Observable<Question> {
    const questionKey$ = this._activatedRoute.params.pipe(
      map(params => params.key)
    );

    return questionKey$.pipe(
        switchMap(key => {
          return this._apollo.watchQuery<{ question: Question }>({
            query: QUESTION_QUERY,
            variables: {
              id: key
            }
          }).valueChanges;
        }),
        map(result => result.data.question)
      );
  }

  public answerQuestion (question: Question, answer: Answer) {
    this._apollo.mutate({
      mutation: SUBMIT_ANSWER,
      variables: {
        questionKey: question.key,
        answer: {
          body: answer.body,
          user: answer.user.key
        }
      },
      optimisticResponse: {
        answerQuestion: {
          ...question,
          answers: [
            ...question.answers,
            answer
          ]
        }
      },
      update: (state, { data }) => {
        state.writeQuery({
          query: QUESTION_QUERY,
          variables: {
            id: question.key
          },
          data: { question: data.answerQuestion }
        });
      }
    }).subscribe();
  }

  private getDraftAnswer (): Observable<Answer> {
    return this._store.select(UserSelectors.user).pipe(
      filter(userInfo => !userInfo.isLoading),
      take(1),
      map(userInfo => {
        return {
          key: 'temp-key',
          user: {
            ...userInfo.user,
            __typename: 'User'
          },
          body: '',
          votes: 0,
          __typename: 'Question'
        };
      })
    );
  }
}
