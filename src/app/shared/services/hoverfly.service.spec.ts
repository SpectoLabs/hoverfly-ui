
import { Injector, ReflectiveInjector } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, ConnectionBackend, Http, ResponseOptions, Response, RequestOptions } from '@angular/http';
import { HoverflyService } from './hoverfly.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('Service: Hoverfly', () => {

  let injector: Injector;
  let backend: MockBackend;
  let lastConnection: MockConnection;
  let service: HoverflyService;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      HoverflyService
    ]);

    service = injector.get(HoverflyService);
    backend = injector.get(ConnectionBackend) as MockBackend;
    backend.connections.subscribe(connection => lastConnection = connection);

  });

  it('getVersion should return hoverfly version', () => {

    let result;
    service.getVersion().subscribe(version => result = version);
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: { version: 'v0.11.4'},
      status: 200
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/v2/hoverfly/version');
    expect(result).toBe('v0.11.4');

  });

  it('getMode should return hoverfly mode', fakeAsync(() => {

    let result;
    service.getMode().take(1).subscribe(mode => result = mode); // take the first event from the series of polling
    tick();  // only effective when this is wrapped in fakeAsync(). Wait for all reactive events to complete

    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: { mode: 'capture'},
      status: 200
    })));
    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe('/api/v2/hoverfly/mode');
    expect(result).toBe('capture');

  }));


});
