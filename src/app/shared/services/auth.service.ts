import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { NgRedux } from '@angular-redux/store';
import { httpErrorHandler, notifyError } from '../http/error-handling';
import { AppState } from '../../app.state';

export const SESSION_API_TOKEN = 'api-token';

@Injectable()
export class AuthService {

  @Output() isAuthEnabled: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private http: Http, private ngRedux: NgRedux<AppState>) {
  }

  checkAuthenticated(): Observable<boolean> {

    return this.http.get('/api/v2/hoverfly/version')
      .map((res: Response) => res.status === 200)
      .catch(err => {
        notifyError(err, this.ngRedux);
        return Observable.of(false);
      });
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
        httpErrorHandler(this.ngRedux));
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
