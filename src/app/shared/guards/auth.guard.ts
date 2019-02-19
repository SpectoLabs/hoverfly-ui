import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private service: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.service.checkAuthenticated().pipe(map((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        this.service.logout();
      }
      return isAuthenticated
    }));
  }
}
