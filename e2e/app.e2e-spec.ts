import { FormPage } from './form.po';
import { AppPage } from './app.po';
import {HelpPage} from './help.po'
import {HomePage} from './home.po';
import {ListPage} from './list.po';
import {SignupPage} from './signup.po';
import {LoginPage} from './login.po';
import {UserPage} from './user.po'
import {browser, element, by, Key, ExpectedConditions} from 'protractor';

describe('course-project App', () => {
  let homepage: HomePage;
  let helppage: HelpPage;
  let apppage: AppPage;
  let listpage: ListPage;
  let formpage: FormPage;
  let signup: SignupPage;
  let login: LoginPage;
  let userpage: UserPage;

  beforeEach(() => {
    homepage = new HomePage();
    helppage = new HelpPage();
    apppage = new AppPage();
    listpage = new ListPage();
    formpage =  new FormPage();
    signup = new SignupPage();
    login = new LoginPage();
    userpage = new UserPage();
    browser.get('slide-toggle');
  });

//   it('should display welcome message', () => {
//     homepage.navigateTo();
//     expect(homepage.getParagraphText()).toEqual('Gator Housing');
//   });

//   it('Logo displayed', () => {
//     homepage.navigateTo();
//     expect(homepage.getIsDisplayed()).toEqual('logo');
//   });

//   it('navigation to Help', () => {
//     apppage.getNavigation().then(function(){
//       expect(helppage.navigateTo);
//     })
//   });

//   it('navigated to Listing from carousel', () => {
//     homepage.navigateTo();
//     homepage.carouselElement().click().then(function(){
//         expect(listpage.navigateTo());
//     })
//   });

//   it ('should show place in places', () => {
//     homepage.navigateTo();
//     const input1 = homepage.postPlace();
//     input1.click();
//     input1.sendKeys('Gainesville');
//     const input2 = homepage.clickStartDate();
//     input2.click();
//     browser.sleep(1000);
//   });

//   it ('should go to form and write', () => {
//     formpage.navigateTo();
//     let input3 = formpage.postAccommodees();
//     input3.sendKeys('I am working yay!!');
//     input3 = formpage.postZipcode();
//     input3.sendKeys('32608');
//     input3 = formpage.postDescription();
//     input3.sendKeys('Good morning class. I am Dilip Kunderu speaking and struggling with e2e testing :)');
//     browser.sleep(2000);
//   });


//   it('should go to step 2 of stepper', () => {
//     homepage.navigateTo();
//     formpage.navigateTo();
//     const input = formpage.stepperNext1();
//     input.click();
//     const input1 = formpage.flipStudio();
//     input1.click();
//     browser.sleep(5000);
//   });


it('Listing details', () => {
  homepage.navigateTo();
  //browser.sleep(2000);
  homepage.carouselElement().click();
  browser.sleep(1000);
  listpage.setStartDate().sendKeys('12/5/2017');
  listpage.setEndDate().sendKeys('12/10/2017');
  listpage.setEmail().sendKeys('meghaname@ufl.edu');
  listpage.request().click();
  browser.sleep(2000);
  });

  it ('should signup, Login as a dummyUser', () => {
    signup.navigateTo();
    signup.addName().sendKeys('DummyUser');
    signup.addEmail().sendKeys('gatorhousing@gmail.com');
    signup.addPassword().sendKeys('hello');
    signup.addCPassword().sendKeys('hello');
    signup.register().click();
    //browser.sleep(2000);
    var EC = ExpectedConditions;
    browser.wait(EC.alertIsPresent(), 5000, "Alert is not getting present :(")
    browser.switchTo().alert().accept();
    //browser.sleep(2000);
    login.addEmail().sendKeys('gatorhousing@gmail.com');
    login.addPassword().sendKeys('hello');
    login.login().click();
    browser.sleep(2000);
    });
    
    it('Discover hosting', () => {
      browser.ignoreSynchronization = true;
      apppage.clickDiscoverHosting().click();
      formpage.postTitle().sendKeys('DummyPost');
      formpage.postZipcode().sendKeys('32608');
      formpage.postDescription().sendKeys('This is a post from end2end testing.');
      formpage.stepperNext1().click();
      browser.sleep(1000);
      formpage.stepperNext2().click();
      formpage.stepperNext3().click();
      formpage.setRent().sendKeys('500');
      formpage.submit().click();
      browser.sleep(3000);
      });

    it('User Listings', () => {
      apppage.navigateTo();
      apppage.clickUserListing().click();
      browser.sleep(1000);
      userpage.deleteListing().click();
      browser.sleep(1000);
    });

});

// describe('course-project App1', () => {
//   let homepage: HomePage;
//   let helppage: HelpPage;
//   let apppage: AppPage;
//   let listpage: ListPage;
//   let formpage: FormPage;

//   beforeEach(() => {
//     homepage = new HomePage();
//     helppage = new HelpPage();
//     apppage = new AppPage();
//     listpage = new ListPage();
//     formpage =  new FormPage();
//     browser.get('slide-toggle');
//   });
// it('should select an option', () => {
//   homepage.navigateTo();
//   formpage.navigateTo();
//   const input = formpage.stepperNext1();
//   input.click();
//   element(by.id('radiogrp1')).all(by.tagName('md-radio-button')).get(0).click();
//   browser.sleep(5000);
// });
// });
