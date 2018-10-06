import { Component, OnInit } from '@angular/core';
import { Question, Answer } from '@ngqa/models';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, switchMap, take, filter, startWith } from 'rxjs/operators';
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

  private _updateQuery$ = new Subject<void>();

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
    return combineLatest(
      questionKey$,
      this._updateQuery$.pipe(startWith(null))
      ).pipe(
        switchMap(([key]) => {
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

  public answerQuestion (questionKey: string, answer: Answer) {
    this._apollo.mutate({
      mutation: SUBMIT_ANSWER,
      variables: {
        questionKey: questionKey,
        answer: {
          body: answer.body,
          user: answer.user.key
        }
      },
      update: () => {
        this._updateQuery$.next();
      }
    }).subscribe();
  }

  private getDraftAnswer (): Observable<Answer> {
    return this._store.select(UserSelectors.user).pipe(
      filter(userInfo => !userInfo.isLoading),
      take(1),
      map(userInfo => {
        return {
          key: null,
          user: userInfo.user,
          body: '',
          votes: 0
        };
      })
    );
  }
}
