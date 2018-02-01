
import { API_ERRORS, notifyError } from './error-handling';
import { NotificationService } from '../../components/notifications/notification.service';
import { MockNotificationService } from '../testing/mock-helper.spec';
import { mockErrorResponse } from '../testing/http-helper.spec';
describe('Http error handler', () => {
  let service: NotificationService;

  beforeEach(() => {
    service = new MockNotificationService() as NotificationService;
  });

  it('should dispatch SERVICE_UNAVAILABLE error on status code 0', () => {
    notifyError(mockErrorResponse(0), service);

    expect(service.sendError).toHaveBeenCalledWith(API_ERRORS.SERVICE_UNAVAILABLE);
  });

  it('should dispatch UNAUTHORIZED error on status code 401', () => {
    notifyError(mockErrorResponse(401), service);

    expect(service.sendError).toHaveBeenCalledWith(API_ERRORS.UNAUTHORIZED);
  });

  it('should dispatch TOO_MANY_REQUESTS error on status code 429', () => {
    notifyError(mockErrorResponse(429), service);

    expect(service.sendError).toHaveBeenCalledWith(API_ERRORS.TOO_MANY_REQUESTS);
  });

  it('should dispatch DEFAULT error on other status code', () => {
    notifyError(mockErrorResponse(500), service);

    expect(service.sendError).toHaveBeenCalledWith(API_ERRORS.DEFAULT);
  });

});
