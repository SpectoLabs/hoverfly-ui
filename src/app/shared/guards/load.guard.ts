

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';


// Prevent user accessing login page when they have an authenticated session
@Injectable()
export class LoadGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(): boolean {
    const hasSession = this.authService.hasSession();
    if (hasSession) {
      this.authService.redirectToHome();
    }
    return !hasSession;
  }

}
