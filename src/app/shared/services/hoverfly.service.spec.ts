import { Injector, ReflectiveInjector } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestMethod,
  RequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import { HOVERFLY_ACTIONS, HoverflyService } from './hoverfly.service';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../app.state';
import { API_ERRORS } from '../http/error-handling';
import { NotificationService } from '../../components/notifications/notification.service';
import { MockNotificationService } from '../testing/mock-helper.spec';
import { mockErrorResponse } from '../testing/http-helper.spec';

describe('Service: Hoverfly', () => {

  let injector: Injector;
  let backend: MockBackend;
  let lastConnection: MockConnection;
  let service: HoverflyService;
  let ngRedux: NgRedux<AppState>;
  let notifyService: MockNotificationService;

  beforeEach(() => {
    ngRedux = new NgRedux<AppState>(null);
    spyOn(ngRedux, 'dispatch');
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: NgRedux, useValue: ngRedux },
      { provide: NotificationService, useClass: MockNotificationService },
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      HoverflyService
    ]);

    service = injector.get(HoverflyService);
    notifyService = <any> injector.get(NotificationService);
    backend = injector.get(ConnectionBackend) as MockBackend;
    backend.connections.subscribe(connection => lastConnection = connection);

  });

  it('getHoverflyInfo should dispatch an update action', () => {

    const hoverflyInfo = {
      destination: 'hoverfly.io',
      mode: 'simulate',
      usage: {
        counters: {
          capture: 0,
          modify: 0,
          simulate: 0,
          spy: 0,
          synthesize: 0
        }
      },
      version: 'v0.15.0',
    };

    service.getHoverflyInfo();
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: hoverflyInfo,
      status: 200
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/v2/hoverfly');
    expect(lastConnection.request.method).toBe(RequestMethod.Get);

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.UPDATE,
      payload: hoverflyInfo
    });

  });

  it('getHoverflyInfo failed should dispatch an error notification action', () => {

    service.getHoverflyInfo();
    lastConnection.mockError(mockErrorResponse(0));

    expect(lastConnection).toBeDefined();

    expect(notifyService.sendError).toHaveBeenCalledWith(API_ERRORS.SERVICE_UNAVAILABLE);
  });

  it('setMode should send hoverfly mode', () => {

    service.setMode('capture');
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: { mode: 'capture' },
      status: 200
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/v2/hoverfly/mode');
    expect(lastConnection.request.method).toBe(RequestMethod.Put);
    expect(lastConnection.request.getBody()).toBe('{"mode":"capture"}');

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.UPDATE,
      payload: { mode: 'capture' }
    });

  });


  it('getMiddleware should dispatch an update action', () => {

    const middlewareData = {
      remote: 'one',
      binary: 'two'
    };
    service.getMiddleware();
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: middlewareData,
      status: 200
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/v2/hoverfly/middleware');
    expect(lastConnection.request.method).toBe(RequestMethod.Get);

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.UPDATE,
      payload: {
        middleware: middlewareData
      }
    });

  });

  it('should not dispatch an update action if getMiddleware returns empty an object', () => {

    service.getMiddleware();
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: {
        remote: '',
        binary: ''
      },
      status: 200
    })));

    expect(lastConnection).toBeDefined();

    expect(ngRedux.dispatch).not.toHaveBeenCalled();

  });

});
