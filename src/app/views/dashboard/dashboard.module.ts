import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HoverflyService } from '../../shared/services/hoverfly.service';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from '@angular-redux/store';
import { NotificationService } from '../../components/notifications/notification.service';

@NgModule({
  declarations: [ DashboardComponent ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    NgReduxModule
  ],
  providers: [
    HoverflyService,
    NotificationService
  ]
})

export class DashboardModule {
}
