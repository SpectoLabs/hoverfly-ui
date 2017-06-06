import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

export const SESSION_TOKEN_KEY = 'api-token';

@Injectable()
export class AuthService {


  @Output()
  onLogin: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private http: Http) {
  }

  checkAuthenticated(): Observable<boolean> {

    return this.http.get('/api/v2/hoverfly/version')
      .map((res: Response) => res.status === 200)
      .catch(err => Observable.of(false));
  }

  login(username, password) {
    this.http.post('/api/token-auth', {
      username: username,
      password: password
    })
      .map((res: Response) => res.json().token)
      .subscribe(token => {
        this.onLogin.emit(true);
        sessionStorage.setItem(SESSION_TOKEN_KEY, token);
        this.redirectToHome();
      }, err => console.log(err));
  }

  logout() {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    this.router.navigate([ '/login' ]);
  }

  redirectToHome() {
    this.router.navigate([ '/dashboard' ]);
  }

  hasSession(): boolean {
    return !!sessionStorage.getItem(SESSION_TOKEN_KEY);
  }
}
