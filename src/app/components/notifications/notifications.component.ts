import { Component, OnInit } from '@angular/core';
import { Notification, NOTIFICATION_TYPE } from './notification.model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public notification: Notification;

  constructor(private service: NotificationService) {
  }

  ngOnInit() {
    this.service.errors.subscribe((notification: Notification) => {
      this.notification = notification || null;
    });
  }

  getAlertClass(notification: Notification) {
    let alertClass = 'success';
    if (notification) {
      alertClass = notification.type === NOTIFICATION_TYPE.ERROR ? 'danger' : 'success';
    }
    return alertClass;
  }

  reset() {
    this.notification = null;
  }
}
