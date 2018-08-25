import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question, Store } from '../../database';
import { FirebaseService, toList } from '../../database/firebase/firebase.service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  public questions$: Observable<Array<Question>>;
  private _destroyed$ = new Subject<void>();
  constructor(
    private _firebaseService: FirebaseService<Store>
  ) { }

  ngOnInit() {
    this.questions$ = this._firebaseService.getItem(['questions']).pipe(
      takeUntil(this._destroyed$),
      toList()
    );
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }
}
