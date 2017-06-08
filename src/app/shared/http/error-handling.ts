import { Response } from '@angular/http';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../app.state';
import { HOVERFLY_ACTIONS } from '../services/hoverfly.service';

export const API_ERRORS = {
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  UNAUTHORIZED: 'UNAUTHORIZED',
  DEFAULT: 'DEFAULT'
};

export function notifyError(ngRedux: NgRedux<AppState>) {

  return err => {
    if (err instanceof Response) {
      // Response with status 0 is returned when network disconnected
      switch (err.status) {
        case 0:
          dispatchError(ngRedux, API_ERRORS.SERVICE_UNAVAILABLE);
          break;
        case 401:
          dispatchError(ngRedux, API_ERRORS.UNAUTHORIZED);
          break;
        default:
          dispatchError(ngRedux, API_ERRORS.DEFAULT);
      }
    }
  }
}

function dispatchError(ngRedux: NgRedux<AppState>, error: string) {
  ngRedux.dispatch({
    type: HOVERFLY_ACTIONS.NOTIFY_ERROR,
    payload: error
  })
}
