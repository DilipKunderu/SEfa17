import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }


  getNavigation() {
    const helpTab = element(by.id('help'));
    return helpTab.click();
  }
}
