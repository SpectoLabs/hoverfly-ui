import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { AlertModule } from 'ngx-bootstrap';
import { NotificationModule } from '../../components/notifications/notification.module';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AlertModule,
    NotificationModule
  ],
  providers: [
    AuthService
  ]
})

export class LoginModule {
}
