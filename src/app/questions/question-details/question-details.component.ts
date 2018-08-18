import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../../database/firebase/firebase.service';
import { Store, Question } from '../../database';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {
  public question$: Observable<Question>;

  constructor(
    private _firebaseService: FirebaseService<Store>
  ) { }

  ngOnInit() {
    this.question$ = this._firebaseService.getChild('questions', 'dummyKey');
  }
}
