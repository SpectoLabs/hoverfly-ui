import { Injector, ReflectiveInjector } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthService, SESSION_API_TOKEN } from './auth.service';
import {
  BaseRequestOptions, ConnectionBackend, Http, RequestOptions, ResponseOptions, Response,
  RequestMethod
} from '@angular/http';
import createSpy = jasmine.createSpy;
import { Router } from '@angular/router';

class MockRouter {
  navigate = createSpy('navigate');
}

describe('Service: Auth', () => {

  let injector: Injector;
  let backend: MockBackend;
  let lastConnection: MockConnection;
  let service: AuthService;
  let router: MockRouter;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: Router, useClass: MockRouter },
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

    expect(router.navigate).toHaveBeenCalledWith([ '/login' ]);
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
    expect(router.navigate).toHaveBeenCalledWith([ '/dashboard' ]);
  });



});
