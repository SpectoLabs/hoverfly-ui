import { HoverflyUiPage } from './app.po';

describe('hoverfly-ui App', function() {
  let page: HoverflyUiPage;

  beforeEach(() => {
    page = new HoverflyUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
