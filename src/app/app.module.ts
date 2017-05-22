import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginModule } from './views/login/login.module';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { TopnavbarModule } from './topnavbar/topnavbar.module';

import { ngModuleSharedProviders } from './shared/index';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    LoginModule,
    DashboardModule,
    TopnavbarModule
  ],
  providers: [
    ...ngModuleSharedProviders,
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
