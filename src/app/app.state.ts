
import { combineReducers } from 'redux';
import { composeReducers } from '@angular-redux/form/dist/source';
import { hoverflyReducer } from './shared/reducers/hoverfly.reducer';
export interface AppState {
  hoverfly
}

export const rootReducer = composeReducers(
  combineReducers<AppState>({
    hoverfly: hoverflyReducer,
  }), (state, action) => {
    return state;
  }
);

export const enhancers = [];
