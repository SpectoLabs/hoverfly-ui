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
export class LoginComponent implements OnInit {
  // @ViewChild('loginForm') public loginForm: NgForm;

  ngOnInit(): void {
    // if (sessionStorage.getItem('api-token')) {
    //
    //   this.router.navigate(['/dashboard'])
    // }
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  login(formValue) {

    this.authService.login(formValue.username, formValue.password);
  }

}
