import { browser, by, element } from 'protractor';

export class LoginPage {
    navigateTo() {
        return browser.get('/login');
    }
    addEmail () {
        return element(by.id('loginEmail'));
    }
    addPassword () {
        return element(by.id('loginPassword'));
    }
    login () {
        return element(by.id('loginClick'));
    }
    
}
