import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HoverflyService } from "../services/hoverfly.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private service: HoverflyService, private router: Router) {
  }

  canActivate() : Observable<boolean>{
    return this.service.isAuthenticated().map(result => {
      if (result === false) {
        this.router.navigate(['/login'])
      }

      return result
    });
  }
}
