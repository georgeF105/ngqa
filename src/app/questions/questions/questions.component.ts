import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '@ngqa/models';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

const QUESTIONS_QUERY = gql`{
  questions {
    key
    body
    answers {
      key
      body
      votes
    }
    user {
      key
      name
    }
  }
}`;
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  public questions$: Observable<Array<Question>>;
  constructor(
    private _apollo: Apollo
  ) { }

  ngOnInit() {
    this.questions$ = this.getQuestions();
  }

  private getQuestions (): Observable<Array<Question>> {
    return this._apollo.query<{ questions: Array<Question> }>({
      query: QUESTIONS_QUERY
    }).pipe(
      map(result => result.data.questions)
    );
  }
}
