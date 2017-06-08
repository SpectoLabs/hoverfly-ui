import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TopNavBarComponent } from './topnavbar.component';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AuthService } from '../../shared/services/auth.service';
import { NotificationService } from '../notifications/notification.service';

@NgModule({
  declarations: [ TopNavBarComponent ],
  imports: [ BrowserModule, RouterModule, HttpModule],
  exports: [ TopNavBarComponent ],
  providers: [
    AuthService,
    NotificationService
  ]
})

export class TopNavBarModule {
}
