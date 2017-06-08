import { Injector, ReflectiveInjector } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthService, SESSION_API_TOKEN } from './auth.service';
import {
  BaseRequestOptions, ConnectionBackend, Http, RequestOptions, ResponseOptions, Response,
  RequestMethod
} from '@angular/http';
import createSpy = jasmine.createSpy;
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'app/app.state';
import { mockErrorResponse } from '../testing/http-helper';
import { HOVERFLY_ACTIONS } from './hoverfly.service';
import { API_ERRORS } from '../http/error-handling';

class MockRouter {
  navigateByUrl = createSpy('navigateByUrl');
}

describe('Service: Auth', () => {

  let injector: Injector;
  let backend: MockBackend;
  let lastConnection: MockConnection;
  let service: AuthService;
  let router: MockRouter;
  let ngRedux: NgRedux<AppState>

  beforeEach(() => {
    ngRedux = new NgRedux<AppState>(null);
    spyOn(ngRedux, 'dispatch');
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: Router, useClass: MockRouter },
      { provide: NgRedux, useValue: ngRedux },
      Http,
      AuthService
    ]);

    service = injector.get(AuthService);
    router = <any> injector.get(Router);
    backend = injector.get(ConnectionBackend) as MockBackend;
    backend.connections.subscribe(connection => lastConnection = connection);
    sessionStorage.clear();

  });

  it('isAuthenticated should return true if response status is 200', () => {

    let result;
    service.checkAuthenticated().subscribe(authenticated => result = authenticated);

    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: { version: 'v0.11.4'},
      status: 200
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/v2/hoverfly/version');
    expect(result).toBeTruthy();
  });

  it('isAuthenticated should return false if response status is not 200', () => {

    let result;
    service.checkAuthenticated().subscribe(authenticated => result = authenticated);

    lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 500
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/v2/hoverfly/version');
    expect(result).toBeFalsy();
  });

  it('should clear session storage on log out', () => {
    sessionStorage.setItem(SESSION_API_TOKEN, 'some-token');

    service.logout();

    expect(sessionStorage.length).toEqual(0);
  });

  it('should navigate to login page on logout', () => {

    service.logout();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });


  it('should handle successful login', () => {

    service.login('user', 'password');

    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: { token: 'some-token'},
      status: 200
    })));
    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/token-auth');

    expect(lastConnection.request.method).toBe(RequestMethod.Post);

    expect(sessionStorage.getItem(SESSION_API_TOKEN)).toBe('some-token');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should dispatch error notification action when login failed', () => {

    service.login('user', 'password');
    lastConnection.mockError(mockErrorResponse(401));

    expect(lastConnection).toBeDefined();

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.NOTIFY_ERROR,
      payload: API_ERRORS.UNAUTHORIZED
    });
  });

  it('should dispatch error notification action when check authentication failed', () => {

    service.checkAuthenticated().subscribe();
    lastConnection.mockError(mockErrorResponse(401));

    expect(lastConnection).toBeDefined();

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.NOTIFY_ERROR,
      payload: API_ERRORS.UNAUTHORIZED
    });
  });


});
