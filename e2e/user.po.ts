import { browser, by, element } from 'protractor';

export class UserPage {
  deleteListing(){
    return element(by.className('cardiv')).element(by.id('button'));
  }
}