import { Component, OnInit, ViewChild } from '@angular/core';
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

  // @ViewChild('loginForm') public loginForm: NgForm;
  router: Router;

  constructor(private authService: AuthService) {
  }

  login(formValue) {

    this.authService.login(formValue.username, formValue.password);
  }

}
