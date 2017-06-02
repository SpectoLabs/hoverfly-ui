import { HoverflyUiPage } from './app.po';

describe('hoverfly-ui App', () => {
  let page: HoverflyUiPage;

  beforeEach(() => {
    page = new HoverflyUiPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
