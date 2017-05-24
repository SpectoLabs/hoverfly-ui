

import { Injector, ReflectiveInjector } from "@angular/core";
import { HoverflyService } from "../services/hoverfly.service";
import createSpy = jasmine.createSpy;
import { AuthGuard } from "./auth.guard";
import { Observable } from "rxjs/Observable";
import { extraEntryParser } from "@angular/cli/models/webpack-configs/utils";
import { Router } from "@angular/router";
import { fakeAsync, tick } from "@angular/core/testing";

class MockHoverflyService {

  isAuthenticated = createSpy('isAuthenticated');
}

class MockRouter {
  navigate = createSpy('navigate');
}

describe('Auth Guard', () => {

  let injector: Injector;
  let service: MockHoverflyService;
  let authGuard: AuthGuard;
  let router: MockRouter;


  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: HoverflyService, useClass: MockHoverflyService },
      { provide: Router, useClass: MockRouter },
      AuthGuard
    ]);

    service = injector.get(HoverflyService);
    router = injector.get(Router);
    authGuard = injector.get(AuthGuard);

  });

  it('should return false if is not authenticated', () => {

    let result;
    service.isAuthenticated.and.returnValue(Observable.of(false));

    authGuard.canActivate().subscribe(activated => result = activated);

    expect(result).toBeFalsy();
  });

  it('should return true if is authenticated', () => {

    let result;
    service.isAuthenticated.and.returnValue(Observable.of(true));

    authGuard.canActivate().subscribe(activated => result = activated);

    expect(result).toBeTruthy();
  });

  it('should logout if is not authenticated', () => {

    service.isAuthenticated.and.returnValue(Observable.of(false));
    authGuard.canActivate().subscribe();

    expect(router.navigate).toHaveBeenCalledWith([ '/login' ]);
  });

});