

import { hoverflyReducer } from './hoverfly.reducer';
import { Map, fromJS } from 'immutable';
import { HOVERFLY_ACTIONS } from '../services/hoverfly.service';

const INITIAL_STATE: Map<any, any> = fromJS({
  hoverfly: {}
});

describe('Reducer: Hoverfly', () => {

  it('should return the initial state', () => {
    expect(hoverflyReducer(INITIAL_STATE, { type: 'NONE' })).toEqual(INITIAL_STATE);
  });

  it('UPDATE action should update hoverfly state', () => {
    const data = {
      version: 'v0.11.5',
      middleware: {
        remote: ''
      },
      usage: {
        counters: {
          simulate: 0,
          capture: 1
        }
      }
    };
    const state = hoverflyReducer(INITIAL_STATE, {
      type: HOVERFLY_ACTIONS.UPDATE,
      payload: data
    }).toJS();

    expect(state.hoverfly).toEqual(data);
  });

});
