import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_NAME, State as UserState } from './user.reducer';
import { User } from '@ngqa/models';

export namespace UserSelectors {
  export const user = createFeatureSelector<UserState>(FEATURE_NAME);

  export const userTokenId = createSelector(
    user,
    userState => {
      return userState.user && userState.user.token || null;
    }
  );
}
