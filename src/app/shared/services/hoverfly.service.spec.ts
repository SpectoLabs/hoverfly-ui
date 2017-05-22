
import { Injector, ReflectiveInjector } from "@angular/core";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { BaseRequestOptions, ConnectionBackend, Http, ResponseOptions, Response, RequestOptions } from "@angular/http";
import { HoverflyService } from "./hoverfly.service";
import { fakeAsync, tick } from "@angular/core/testing";

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
      body: { version: "v0.11.4"},
      status: 200
    })));

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toBe("http://localhost:8888/api/v2/hoverfly/version");
    expect(result).toBe("v0.11.4");

  });

});