import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  providers: [ AuthService ]
})

export class LoginModule {
}
