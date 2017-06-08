
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../app.state';
import { API_ERRORS, notifyError } from './error-handling';
import { mockErrorResponse } from '../testing/http-helper';
import { HOVERFLY_ACTIONS } from '../services/hoverfly.service';
describe('Http error handler', () => {
  let ngRedux: NgRedux<AppState>;

  beforeEach(() => {
    ngRedux = new NgRedux<AppState>(null);
    spyOn(ngRedux, 'dispatch');
  });

  it('should dispatch SERVICE_UNAVAILABLE error on status code 0', () => {
    notifyError(mockErrorResponse(0), ngRedux);

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.NOTIFY_ERROR,
      payload: API_ERRORS.SERVICE_UNAVAILABLE
    })
  });

  it('should dispatch UNAUTHORIZED error on status code 401', () => {
    notifyError(mockErrorResponse(401), ngRedux);

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.NOTIFY_ERROR,
      payload: API_ERRORS.UNAUTHORIZED
    })
  });

  it('should dispatch TOO_MANY_REQUESTS error on status code 429', () => {
    notifyError(mockErrorResponse(429), ngRedux);

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.NOTIFY_ERROR,
      payload: API_ERRORS.TOO_MANY_REQUESTS
    })
  });

  it('should dispatch DEFAULT error on other status code', () => {
    notifyError(mockErrorResponse(500), ngRedux);

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.NOTIFY_ERROR,
      payload: API_ERRORS.DEFAULT
    })
  });

});
