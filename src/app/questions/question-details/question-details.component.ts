import { Component, OnInit } from '@angular/core';
import { Question } from '@ngqa/models';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private _apollo: Apollo,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.question$ = this.getQuestion();
  }

  private getQuestion (): Observable<Question> {
    const questionKey$ = this._activatedRoute.params.pipe(
      map(params => params.key)
    );
    return questionKey$.pipe(
      switchMap(key => {
        return this._apollo.query<{ question: Question }>({
          query: QUESTION_QUERY,
          variables: {
            id: key
          }
        });
      }),
      map(result => result.data.question)
    );
  }

  public answerQuestion () {
    console.log('answer question', this.answer);
  }
}
