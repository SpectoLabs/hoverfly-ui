import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: [
    'login.component.css'
  ]
})
export class LoginComponent {

  public username: string;
  public password: string;
  router: Router;

  constructor(private authService: AuthService) {

  }

  login() {
    this.authService.login(this.username, this.password);
  }

}
