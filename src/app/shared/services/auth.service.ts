import { Injectable, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
@Injectable()
export class AuthService {

  private authenticatedUserUrl;

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
        sessionStorage.setItem('api-token', token);
        this.router.navigate([ '/dashboard' ]);
      }, err => console.log(err));
  }

  logout() {
    sessionStorage.removeItem('api-key')
    this.router.navigate([ '/login' ])
  }
}