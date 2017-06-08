import createSpy = jasmine.createSpy;

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


