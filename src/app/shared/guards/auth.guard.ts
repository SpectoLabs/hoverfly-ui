import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private service: AuthService) {
  }

  canActivate() : Observable<boolean>{
    return this.service.checkAuthenticated().map(result => {
      if (result === false) {
        this.service.logout();
      }

      return result
    });
  }
}
