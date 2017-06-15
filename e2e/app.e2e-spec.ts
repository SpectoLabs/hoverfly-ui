import { HoverflyUiPage } from './app.po';

describe('hoverfly-ui App', () => {
  let page: HoverflyUiPage;

  beforeEach(() => {
    page = new HoverflyUiPage();
  });

  it('should show hoverfly info', done => {
    page.navigateTo();
    page.getHoverflyInfoMode()
      .then(msg => expect(msg).toEqual('simulate'))
      .then(done, done.fail);
  });
});
