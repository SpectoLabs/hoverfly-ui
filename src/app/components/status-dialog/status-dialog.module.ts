import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusDialogComponent } from './status-dialog.component';
import { AuthService } from '../../shared/services/auth.service';
import { RouterModule } from '@angular/router';
import { DialogboxModule } from '../dialogbox/dialogbox.module';
import { StatusDialogService } from './status-dialog.service';
import { NotificationService } from '../notifications/notification.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DialogboxModule
  ],
  declarations: [
    StatusDialogComponent
  ],
  providers: [
    StatusDialogService,
    AuthService,
    NotificationService
  ],
  exports: [
    StatusDialogComponent
  ]
})
export class StatusDialogModule { }
