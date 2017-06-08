import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { NgRedux, select } from '@angular-redux/store';
import { API_ERRORS, notifyError } from '../http/error-handling';
import { AppState } from '../../app.state';

export const SESSION_API_TOKEN = 'api-token';

@Injectable()
export class AuthService implements OnInit {

  @Output() isAuthEnabled: EventEmitter<boolean> = new EventEmitter();

  @select([ 'hoverfly', 'error' ]) error$: Observable<string>;

  ngOnInit(): void {
    this.error$
      .filter(error => error === API_ERRORS.UNAUTHORIZED)
      .subscribe(() => this.logout());
  }

  constructor(private router: Router, private http: Http, private ngRedux: NgRedux<AppState>) {
  }

  checkAuthenticated(): Observable<boolean> {

    return this.http.get('/api/v2/hoverfly/version')
      .map((res: Response) => res.status === 200)
      .catch(err => Observable.of(false));
  }

  login(username, password): void {
    this.http.post('/api/token-auth', {
      username: username,
      password: password
    })
      .map((res: Response) => res.json().token)
      .subscribe(token => {
          sessionStorage.setItem(SESSION_API_TOKEN, token);
          this.redirectToHome();
        },
        notifyError(this.ngRedux));
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  redirectToHome() {
    this.router.navigateByUrl('/dashboard');
  }

  hasSession(): boolean {
    return !!sessionStorage.getItem(SESSION_API_TOKEN);
  }
}
