import { browser, by, element } from 'protractor';

export class HoverflyUiPage {
  navigateTo() {
    return browser.get('/dashboard');
  }

  getHoverflyInfoMode() {
    // browser.pause();
    return element(by.css('#hoverfly-info-mode span')).getText();
  }

}
