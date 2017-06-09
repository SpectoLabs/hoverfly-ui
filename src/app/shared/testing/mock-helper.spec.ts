
import createSpy = jasmine.createSpy;
import { EventEmitter } from '@angular/core';

export class MockAuthService {
  checkAuthenticated = createSpy('checkAuthenticated');
  logout = createSpy('logout');
  hasSession = createSpy('hasSession');
  redirectToHome = createSpy('redirectToHome');
}

export class MockRouter {
  navigateByUrl = createSpy('navigateByUrl');
  url = '/';

  setUrl(url) {
    this.url = url;
  }
}

export class MockNotificationService {
  errors = new EventEmitter<string>();
  events = new EventEmitter<string>();
  sendError = createSpy('sendError');
  sendEvent = createSpy('sendEvent');
}


