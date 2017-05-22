import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [ BrowserModule, RouterModule, FormsModule ],
})

export class LoginModule {
}
