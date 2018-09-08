import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  LogInUserAction,
  LogInUserSuccessAction,
  UserActionTypes,
  LogInUserFailAction,
  LogOutUserAction,
  LogOutUserSuccessAction,
  LogOutUserFailAction
} from './user.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { FirebaseService } from '../firebase/firebase.service';
import { of, from } from 'rxjs';


@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private _firebaseService: FirebaseService
  ) {}

  @Effect()
  public LogInUserEffect$ = this.actions$.pipe(
    ofType<LogInUserAction>(UserActionTypes.LogInUser),
    switchMap(() => from(this._firebaseService.logInUser()).pipe(
      map(user => new LogInUserSuccessAction(user)),
      catchError(err => [new LogInUserFailAction(err)])
    ))
  );

  @Effect()
  public LogOutUserEffect$ = this.actions$.pipe(
    ofType<LogOutUserAction>(UserActionTypes.LogOutUser),
    switchMap(() => from(this._firebaseService.logOutUser()).pipe(
      map(() => new LogOutUserSuccessAction()),
      catchError(err => [new LogOutUserFailAction(err)])
    ))
  );
}
