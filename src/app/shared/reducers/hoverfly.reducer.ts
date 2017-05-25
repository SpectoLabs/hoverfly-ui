import { Hoverfly, NullHoverfly } from "../models/hoverfly.model";
import { createReducer } from "../create-reducer";
import { fromJS, Map } from "immutable";
import { HOVERFLY_ACTIONS } from "../services/hoverfly.service";
export interface HoverflyState {
  hoverfly: Hoverfly;
}

const INITIAL_STATE: Map<any, any> = fromJS({
  hoverfly: new NullHoverfly()
});

export const hoverflyReducer = createReducer(INITIAL_STATE, {

  [HOVERFLY_ACTIONS.UPDATE]: (state: Map<any, any>, action) =>
    state.merge({
      hoverfly: [ ...state.get('hoverfly'), ...fromJS(action.payload) ]
    })
});