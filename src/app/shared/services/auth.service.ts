import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

export const SESSION_API_TOKEN = 'api-token';

@Injectable()
export class AuthService {

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
        sessionStorage.setItem(SESSION_API_TOKEN, token);
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
