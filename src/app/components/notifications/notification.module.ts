

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationsComponent } from './notifications.component';
import { NotificationService } from './notification.service';
import { AlertModule } from 'ngx-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    AlertModule
  ],
  declarations: [
    NotificationsComponent,
  ],
  providers: [
    NotificationService
  ],
  exports: [
    NotificationsComponent
  ]
})
export class NotificationModule {
}
