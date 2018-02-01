import { fromJS, Map } from 'immutable';
import { HOVERFLY_ACTIONS } from '../services/hoverfly.service';

const INITIAL_STATE: Map<any, any> = fromJS({
  hoverfly: {}
});

export const hoverflyReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

      case HOVERFLY_ACTIONS.UPDATE:
        return state.update('hoverfly', (hoverfly: Map<any, any>) => hoverfly.merge(fromJS(action.payload)));

      default:
        return state;
    }
};
