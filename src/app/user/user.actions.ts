import { Action } from '@ngrx/store';
import { User } from '@ngqa/models';

export enum UserActionTypes {
  LogInUser = '[User] Log in user',
  LogInUserSuccess = '[User] Log in user success',
  LogOutUser = '[User] Log in user'
}

export class LogInUserAction implements Action {
  public readonly type = UserActionTypes.LogInUser;
}

export class LogInUserSuccessAction implements Action {
  constructor (
    public user: User
  ) { }
  readonly type = UserActionTypes.LogInUserSuccess;
}

export class LogOutUserAction implements Action {
  readonly type = UserActionTypes.LogOutUser;
}

export type UserActions = LogInUserAction | LogInUserSuccessAction | LogOutUserAction;
