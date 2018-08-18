import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question, Store } from '../../database';
import { FirebaseService } from '../../database/firebase/firebase.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  public questions$: Observable<Array<Question>>;
  constructor(
    private _firebaseService: FirebaseService<Store>
  ) { }

  ngOnInit() {
    this.questions$ = this._firebaseService.getChildren('questions');
  }

}
