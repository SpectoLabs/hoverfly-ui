
import { combineReducers } from 'redux';
import { hoverflyReducer } from './shared/reducers/hoverfly.reducer';
export interface AppState {
  hoverfly
}

export const rootReducer = combineReducers<AppState>({
  hoverfly: hoverflyReducer,
});

export const enhancers = [];
