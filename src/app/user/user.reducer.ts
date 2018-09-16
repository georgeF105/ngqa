import { Action } from '@ngrx/store';
import { User } from '@ngqa/models';
import { UserActionTypes, UserActions } from './user.actions';


export interface State {
  user: User;
  isLoading: boolean;
  error: Error;
}

export const initialState: State = {
  user: null,
  isLoading: true,
  error: null
};

export const FEATURE_NAME = 'user';

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.GetUserLoginStatus:
    case UserActionTypes.LogInUser:
      return !state.user ? {
        ...state,
        isLoading: true
      } : state;
    case UserActionTypes.LogInUserSuccess:
      return {
        user: action.user,
        isLoading: false,
        error: null
      };
    case UserActionTypes.LogInUserFail:
      return {
        user: null,
        isLoading: false,
        error: action.error
      };
    case UserActionTypes.LogOutUser:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.LogOutUserSuccess:
      return {
        user: null,
        isLoading: false,
        error: null
      };
    case UserActionTypes.LogOutUserFail:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
}
