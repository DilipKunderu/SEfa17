import { browser, by, element } from 'protractor';

export class ListPage {
  setStartDate(){
    return element(by.id('startDate'));
  }
  setEndDate(){
    return element(by.id('endDate'));
  }
  setEmail(){
    return element(by.id('requestEmail'));
  }
  request(){
    return element(by.id('request'));
  }
}
