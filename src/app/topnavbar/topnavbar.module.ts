import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TopnavbarComponent } from './topnavbar.component';
import { RouterModule } from '@angular/router';
import { HoverflyService } from "../shared/services/hoverfly.service";
import { HttpModule } from "@angular/http";
import { AuthService } from "../shared/services/auth.service";

@NgModule({
  declarations: [ TopnavbarComponent ],
  imports: [ BrowserModule, RouterModule, HttpModule],
  exports: [ TopnavbarComponent ],
  providers: [
    HoverflyService,
    AuthService
  ]
})

export class TopnavbarModule {
}
