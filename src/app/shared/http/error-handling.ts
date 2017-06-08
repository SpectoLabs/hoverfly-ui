import { Response } from '@angular/http';
import { NotificationService } from '../../components/notifications/notification.service';

export const API_ERRORS = {
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  UNAUTHORIZED: 'UNAUTHORIZED',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  DEFAULT: 'DEFAULT'
};

export function httpErrorHandler(notifyService: NotificationService) {

  return err => notifyError(err, notifyService);
}

export function notifyError(err, notifyService: NotificationService) {
  if (err instanceof Response) {
    // Response with status 0 is returned when network disconnected
    switch (err.status) {
      case 0:
        notifyService.sendError(API_ERRORS.SERVICE_UNAVAILABLE);
        break;
      case 401:
        notifyService.sendError(API_ERRORS.UNAUTHORIZED);
        break;
      case 429:
        notifyService.sendError(API_ERRORS.TOO_MANY_REQUESTS);
        break;
      default:
        notifyService.sendError(API_ERRORS.DEFAULT);
    }
  } else {
    // TODO send generic error message to user
    console.log('Caught error: ' + err);
  }
}

