import { Action } from '@ngrx/store';
import { User } from '@ngqa/models';
import { UserActionTypes, UserActions } from './user.actions';


export interface State {
  user: User;
  isLoading: boolean;
}

export const initialState: State = {
  user: null,
  isLoading: false
};

export const FEATURE_NAME = 'user';

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LogInUser:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.LogInUserSuccess:
      return {
        user: action.user,
        isLoading: false
      };
    default:
      return state;
  }
}
