import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: [
    'login.component.css'
  ]
})
export class LoginComponent {

  public loginError: string;

  constructor(private authService: AuthService) {
  }

  login(formValue) {

    this.authService.login(formValue.username, formValue.password);
  }

}
