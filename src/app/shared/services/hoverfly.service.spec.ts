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

describe('Service: Hoverfly', () => {

  let injector: Injector;
  let backend: MockBackend;
  let lastConnection: MockConnection;
  let service: HoverflyService;
  let ngRedux: NgRedux<AppState>;

  beforeEach(() => {
    ngRedux = new NgRedux<AppState>(null);
    spyOn(ngRedux, 'dispatch');
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: NgRedux, useValue: ngRedux },
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      HoverflyService
    ]);

    service = injector.get(HoverflyService);
    backend = injector.get(ConnectionBackend) as MockBackend;
    backend.connections.subscribe(connection => lastConnection = connection);

  });

  it('getVersion should dispatch an update action', () => {

    service.getVersion();
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: { version: 'v0.11.4' },
      status: 200
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/v2/hoverfly/version');
    expect(lastConnection.request.method).toBe(RequestMethod.Get);

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.UPDATE,
      payload: { version: 'v0.11.4' }
    });

  });

  it('getMode should dispatch an update action', () => {

    service.getMode();
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: { mode: 'capture' },
      status: 200
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/v2/hoverfly/mode');
    expect(lastConnection.request.method).toBe(RequestMethod.Get);

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.UPDATE,
      payload: { mode: 'capture' }
    });

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

  it('getDestination should dispatch an update action', () => {

    service.getDestination();
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: { destination: 'destination.com' },
      status: 200
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/v2/hoverfly/destination');
    expect(lastConnection.request.method).toBe(RequestMethod.Get);

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.UPDATE,
      payload: { destination: 'destination.com' }
    });

  });

  it('getMiddleware should dispatch an update action', () => {

    service.getMiddleware();
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: {
        remote: 'one',
        binary: 'two'
      },
      status: 200
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/v2/hoverfly/middleware');
    expect(lastConnection.request.method).toBe(RequestMethod.Get);

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.UPDATE,
      payload: {
        middleware: {
          remote: 'one',
          binary: 'two'
        }
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

  it('getUsage should dispatch an update action', () => {

    service.getUsage();

    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: {
        usage: {
          counters: {
            capture: 1,
            modify: 2,
            simulate: 3,
            synthesize: 4
          }
        }
      },
      status: 200
    })));
    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/v2/hoverfly/usage');
    expect(lastConnection.request.method).toBe(RequestMethod.Get);

    expect(ngRedux.dispatch).toHaveBeenCalledWith({
      type: HOVERFLY_ACTIONS.UPDATE,
      payload: {
        usage: {
          counters: {
            capture: 1,
            modify: 2,
            simulate: 3,
            synthesize: 4
          }
        }
      }
    });
  });

});
