import { Action } from '@ngrx/store';
import { User } from '@ngqa/models';

export enum UserActionTypes {
  LogInUser = '[User] Log in user',
  LogInUserSuccess = '[User] Log in user success',
  LogInUserFail = '[User] Log in user fail',
  LogOutUser = '[User] Log out user',
  LogOutUserSuccess = '[User] Log out user success',
  LogOutUserFail = '[User] Log out user fail'
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

export class LogInUserFailAction implements Action {
  constructor (
    public error: Error
  ) { }
  readonly type = UserActionTypes.LogInUserFail;
}

export class LogOutUserAction implements Action {
  readonly type = UserActionTypes.LogOutUser;
}

export class LogOutUserSuccessAction implements Action {
  readonly type = UserActionTypes.LogOutUserSuccess;
}

export class LogOutUserFailAction implements Action {
  constructor (
    public error: Error
  ) { }
  readonly type = UserActionTypes.LogOutUserFail;
}

export type UserActions = LogInUserAction
  | LogInUserSuccessAction
  | LogInUserFailAction
  | LogOutUserAction
  | LogOutUserSuccessAction
  | LogOutUserFailAction;
