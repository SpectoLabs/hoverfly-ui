import { Response } from '@angular/http';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../app.state';
import { HOVERFLY_ACTIONS } from '../services/hoverfly.service';

export const API_ERRORS = {
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  UNAUTHORIZED: 'UNAUTHORIZED',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  DEFAULT: 'DEFAULT'
};

export function httpErrorHandler(ngRedux: NgRedux<AppState>) {

  return err => notifyError(err, ngRedux);
}

export function notifyError(err, ngRedux: NgRedux<AppState>) {
  if (err instanceof Response) {
    // Response with status 0 is returned when network disconnected
    switch (err.status) {
      case 0:
        dispatchError(ngRedux, API_ERRORS.SERVICE_UNAVAILABLE);
        break;
      case 401:
        dispatchError(ngRedux, API_ERRORS.UNAUTHORIZED);
        break;
      case 429:
        dispatchError(ngRedux, API_ERRORS.TOO_MANY_REQUESTS);
        break;
      default:
        dispatchError(ngRedux, API_ERRORS.DEFAULT);
    }
  } else {
    // TODO send generic error message to user
    console.log('Caught error: ' + err);
  }
}


function dispatchError(ngRedux: NgRedux<AppState>, error: string) {
  ngRedux.dispatch({
    type: HOVERFLY_ACTIONS.NOTIFY_ERROR,
    payload: error
  })
}
