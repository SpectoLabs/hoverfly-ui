
import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable()
export class NotificationService {

  @Output()
  errors: EventEmitter<string> = new EventEmitter();


  sendError(error: string) {
    this.errors.emit(error);
  }

}
