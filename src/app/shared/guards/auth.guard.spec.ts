

import { Injector, ReflectiveInjector } from '@angular/core';
import createSpy = jasmine.createSpy;
import { AuthGuard } from './auth.guard';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../testing/mock-helper.spec';

describe('Auth Guard', () => {

  let injector: Injector;
  let service: MockAuthService;
  let authGuard: AuthGuard;


  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: AuthService, useClass: MockAuthService },

      AuthGuard
    ]);

    service = <any> injector.get(AuthService);
    authGuard = injector.get(AuthGuard);

  });

  it('should return false if is not authenticated', () => {

    let result;
    service.checkAuthenticated.and.returnValue(Observable.of(false));

    authGuard.canActivate().subscribe(activated => result = activated);

    expect(result).toBeFalsy();
  });

  it('should return true if is authenticated', () => {

    let result;
    service.checkAuthenticated.and.returnValue(Observable.of(true));

    authGuard.canActivate().subscribe(activated => result = activated);

    expect(result).toBeTruthy();
  });

  it('should logout if is not authenticated', () => {

    service.checkAuthenticated.and.returnValue(Observable.of(false));
    authGuard.canActivate().subscribe();

    expect(service.logout).toHaveBeenCalled();
  });


});
