import { browser, by, element } from 'protractor';

export class SignupPage {
    navigateTo() {
        return browser.get('/signup');
    }
    addName () {
        return element(by.id('signupName'));
    }
    addEmail () {
            return element(by.id('signupEmail'));
    }
    addPassword () {
        return element(by.id('signupPassword'));
    }
    addCPassword () {
        return element(by.id('signupCPassword'));
    }
    register () {
        return element(by.id('register'));
    }
    
}
