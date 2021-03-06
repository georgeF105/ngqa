import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  LogInUserAction,
  LogInUserSuccessAction,
  UserActionTypes,
  LogInUserFailAction,
  LogOutUserAction,
  LogOutUserSuccessAction,
  LogOutUserFailAction,
  GetUserLoginStatusAction
} from './user.actions';
import { map, switchMap, catchError, mapTo, withLatestFrom, filter } from 'rxjs/operators';
import { from, race, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserSelectors } from './user.selectors';
import { FirebaseUserService } from '../firebase/user/firebase-user.service';


@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private _firebaseUserService: FirebaseUserService,
    private _store: Store<any>
  ) {}

  @Effect()
  public GetUserLoginStatus = this.actions$.pipe(
    ofType<GetUserLoginStatusAction>(UserActionTypes.GetUserLoginStatus),
    withLatestFrom(this._store.select(UserSelectors.user)),
    filter(([_, user]) => !user.user),
    switchMap(() => {
      const user$ = from(this._firebaseUserService.listenToLogInStatus());
      return race(
        user$,
        timer(2000).pipe(mapTo(null))
      );
    }),
    map(user => {
      if (user) {
        return new LogInUserSuccessAction(user);
      }
      return new LogOutUserSuccessAction();
    })
  );

  @Effect()
  public LogInUserEffect$ = this.actions$.pipe(
    ofType<LogInUserAction>(UserActionTypes.LogInUser),
    switchMap(() => from(this._firebaseUserService.logInUser()).pipe(
      map(user => new LogInUserSuccessAction(user)),
      catchError(err => [new LogInUserFailAction(err)])
    ))
  );

  @Effect()
  public LogOutUserEffect$ = this.actions$.pipe(
    ofType<LogOutUserAction>(UserActionTypes.LogOutUser),
    switchMap(() => from(this._firebaseUserService.logOutUser()).pipe(
      map(() => new LogOutUserSuccessAction()),
      catchError(err => [new LogOutUserFailAction(err)])
    ))
  );
}
