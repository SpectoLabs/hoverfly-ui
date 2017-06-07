

import { Injector, ReflectiveInjector } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ConnectionBackend, Http, RequestOptions, ResponseOptions, Response } from '@angular/http';
import { CustomRequestOptions } from './custom-request-options';
import { SESSION_API_TOKEN } from '../services/auth.service';
describe('HTTP: Custom request options', () => {

  let injector: Injector;
  let backend: MockBackend;
  let lastConnection: MockConnection;
  let http: Http;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: CustomRequestOptions },
      Http
    ]);

    http = injector.get(Http);
    backend = injector.get(ConnectionBackend) as MockBackend;
    backend.connections.subscribe(connection => lastConnection = connection);
    sessionStorage.clear();
  });

  it('should append base url from environment', () => {
    http.get('/api/v2/hoverfly/version');

    lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 200
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('http://localhost:8888/api/v2/hoverfly/version');
  });

  it('should add authorization header if token is present', () => {
    sessionStorage.setItem(SESSION_API_TOKEN, 'some-token');
    http.get('/api/v2/hoverfly/version');

    lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 200
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.headers.get('Authorization')).toBe('Bearer some-token');
  });

  it('should not add authorization header if token is absent', () => {
    http.get('/api/v2/hoverfly/version');

    lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 401
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.headers.get('Authorization')).toBeFalsy();
  });

});

