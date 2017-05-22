import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HoverflyService } from '../../shared/services/hoverfly.service';

@NgModule({
  declarations: [ DashboardComponent ],
  imports: [ BrowserModule, RouterModule, FormsModule ],
  providers: [ HoverflyService ]
})

export class DashboardModule {
}
