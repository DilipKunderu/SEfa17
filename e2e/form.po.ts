import { browser, by, element } from 'protractor';

export class FormPage {
    navigateTo() {
        return browser.get('/add-sublease-form');
    }

    postAccommodees() {
        return element(by.id('accomodates1'));
    }
    postTitle () {
        return element(by.id('title'));
    }
    postZipcode () {
        return element(by.id('zipcode'));
    }

    postDescription () {
        return element(by.id('description'));
    }

    stepperNext1() {
        return element(by.id('stepper1'));
    }

    stepperNext2() {
        return element(by.id('stepper2'));
    }

    stepperNext3() {
        return element(by.id('stepper3'));
    }

    submit(){
        return element(by.id('postSubmit'));
    }

    setBedrooms(){
        return element(by.id('bedrooms'));
    }

    setBathrooms(){
        return element(by.id('bathrooms'));
    }

    setRent(){
        return element(by.id('rent'));
    }

    setStartDate(){
        return element(by.id('start_date'));
    }

    setEndtDate(){
        return element(by.id('end_date'));
    }

    flipStudio() {
        return element(by.id('studio_toggle'));
    }
}
