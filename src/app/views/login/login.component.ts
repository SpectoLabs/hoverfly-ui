import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [
    'login.component.css'
  ]
})
export class LoginComponent {

  public username: string;
  public password: string;
  router: Router;

  login() {
    console.log('logging in ' + this.username + ':' + this.password);
    // this.router.navigate(['/dashboard']);
     window.location.href = 'dashboard';
  }

}
