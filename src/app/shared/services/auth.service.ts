

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
@Injectable()
export class AuthService {

  private authenticatedUserUrl;

  constructor(private router: Router, private http: Http) {
  }

  checkAuthenticated(): Observable<boolean> {

    return this.http.get('/api/v2/hoverfly/version')
      .map((res: Response) => res.status === 200)
      .catch(err => {
        console.log(err)
        return Observable.of(false);
      });
  }

  logout() {

    this.router.navigate([ '/login' ])
  }
}