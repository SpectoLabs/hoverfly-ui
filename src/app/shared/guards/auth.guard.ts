import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private service: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.service.checkAuthenticated().map((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        this.service.logout();
      }
      return isAuthenticated
    });
  }
}
