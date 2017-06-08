
import { Injector, ReflectiveInjector } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { StatusDialogService } from './status-dialog.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { fakeAsync, tick } from '@angular/core/testing';
import { MockAuthService, MockRouter } from '../../shared/testing/mock-helper.spec';
describe('Service: StatusDialog', () => {

  let injector: Injector;
  let service: StatusDialogService;
  let authService: MockAuthService;
  let router = new MockRouter();

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: Router, useValue: router },
      { provide: AuthService, useClass: MockAuthService },
      StatusDialogService
    ]);

    service = injector.get(StatusDialogService);
    authService = <any> injector.get(AuthService);
    router = <any> injector.get(Router);
    spyOn(service, 'pageReload');
  });

  it('should reload page if Hoverfly is running again', () => {
    authService.checkAuthenticated.and.returnValue(Observable.of(true));

    service.retry();

    expect(service.pageReload).toHaveBeenCalled();
  });

  it('should do nothing if Hoverfly is down', () => {

    authService.checkAuthenticated.and.returnValue(Observable.of(false));

    service.retry();

    expect(service.pageReload).not.toHaveBeenCalled();
  });

  it('should navigate to dashboard from login page when Hoverfly is running again', fakeAsync(() => {

    authService.checkAuthenticated.and.returnValue(Observable.of(true));
    // Mocking router url
    router.setUrl('/login');
    router.navigateByUrl.and.returnValue(Promise.resolve(true));

    service.retry();

    tick();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    expect(service.pageReload).toHaveBeenCalled();
  }));

});

