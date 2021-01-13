import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getNameOfFirstHeader() {
    return element(by.css('app-root .p-datatable-thead > tr:nth-child(1) > th:nth-child(1)')).getText() as Promise<string>;
  }
}
