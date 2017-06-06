

import createSpy = jasmine.createSpy;
import { Injector, ReflectiveInjector } from '@angular/core';
import { LoadGuard } from './load.guard';
import { AuthService } from '../services/auth.service';
class MockAuthService {

  hasSession = createSpy('hasSession');
  redirectToHome = createSpy('redirectToHome');
}



describe('Load Guard', () => {

  let injector: Injector;
  let service: MockAuthService;
  let loadGuard: LoadGuard;


  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: AuthService, useClass: MockAuthService },
      LoadGuard
    ]);

    service = <any> injector.get(AuthService);
    loadGuard = injector.get(LoadGuard);

  });

  it('should return false if user has active session', () => {

    service.hasSession.and.returnValue(true);

    expect(loadGuard.canActivate()).toBeFalsy();
  });

  it('should return true if user does not have active session', () => {

    service.hasSession.and.returnValue(false);

    expect(loadGuard.canActivate()).toBeTruthy();
  });

  it('should redirect to home page if current session is still active', () => {

    service.hasSession.and.returnValue(true);
    loadGuard.canActivate();

    expect(service.redirectToHome).toHaveBeenCalled();
  });


});
