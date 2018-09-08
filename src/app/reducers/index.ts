import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { State as UserState } from '../user/user.reducer';

import {
  apolloReducer, CacheState,
} from 'apollo-angular-cache-ngrx';

import { environment } from '../../environments/environment';

export interface State {
  user?: UserState;
  apollo: CacheState;
}

export const reducers: ActionReducerMap<State> = {
  apollo: apolloReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
