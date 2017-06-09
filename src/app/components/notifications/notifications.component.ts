import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { API_ERRORS } from '../../shared/http/error-handling';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public notification: string;

  constructor(private service: NotificationService) {
  }

  ngOnInit() {
    this.service.errors
      .subscribe(error => {
        if (error === API_ERRORS.UNAUTHORIZED) {
          this.notification = 'Authentication failed. Please log in again.';
        } else if (error === API_ERRORS.TOO_MANY_REQUESTS) {
          this.notification = 'Too many unsuccessful login attempts. Please wait 10 minutes before trying again.';
        }
        // other error is ignored?
      })
  }
}
