import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { API_ERRORS } from '../../shared/http/error-handling';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: [
    'login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public loginError: string;
  @select([ 'hoverfly', 'error' ]) error$: Observable<string>;

  ngOnInit(): void {

    this.error$.subscribe(error => {
      if (error === API_ERRORS.UNAUTHORIZED) {
        this.loginError = 'Please try again.';
      } else if (error === API_ERRORS.TOO_MANY_REQUESTS) {
        this.loginError = 'Too many unsuccessful login attempts. Please wait 10 minutes before trying again.';
      }
      // other error is ignored?
    })
  }

  constructor(private authService: AuthService) {
  }

  login(formValue) {

    this.authService.login(formValue.username, formValue.password);
  }

}
