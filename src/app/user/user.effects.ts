import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LogInUserAction, LogInUserSuccessAction, UserActionTypes } from './user.actions';
import { map } from 'rxjs/operators';


@Injectable()
export class UserEffects {

  constructor(private actions$: Actions) {}

  @Effect()
  public LogInUserEffect$ = this.actions$.pipe(
    ofType<LogInUserAction>(UserActionTypes.LogInUser),
    map(action => new LogInUserSuccessAction({ name: 'dummyUser', email: null }))
  );
}
