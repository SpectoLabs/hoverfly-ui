import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

export const SESSION_API_TOKEN = 'api-token';
export const SESSION_AUTH_ENABLED = 'auth-enabled';

@Injectable()
export class AuthService {
  @Output() isAuthEnabled: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private http: Http) {
  }

  checkAuthenticated(): Observable<boolean> {

    // if (!!sessionStorage.getItem(SESSION_AUTH_ENABLED)) {
    //   this.isAuthEnabled.emit(true);
    //   console.log('auth enabled')
    // }
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
        // sessionStorage.setItem(SESSION_AUTH_ENABLED, 'true');
        // this.isAuthEnabled.emit(true);
        console.log('login checked');
        this.redirectToHome();
      }, err => console.log(err));
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate([ '/login' ]);
  }

  redirectToHome() {
    this.router.navigate([ '/dashboard' ]);
  }

  hasSession(): boolean {
    return !!sessionStorage.getItem(SESSION_API_TOKEN);
  }
}
