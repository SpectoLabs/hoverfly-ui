
import { EventEmitter, Injectable, Output } from '@angular/core';

export const EVENT_TYPE = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

@Injectable()
export class NotificationService {

  @Output()
  errors: EventEmitter<string> = new EventEmitter();

  @Output()
  events: EventEmitter<string> = new EventEmitter();

  sendError(error: string) {
    this.errors.emit(error);
  }

  sendEvent(event: string) {
    this.events.emit(event);
  }

}
