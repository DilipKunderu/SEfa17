[![Build Status](https://img.shields.io/travis/DilipKunderu/SEfa17.svg?style=flat-square)](https://travis-ci.org/DilipKunderu/SEfa17)

 # Gator Housing - Apartment/Sublease finder website.
 
 ## Description
 The project aims to develop an online marketplace enabling people to lease or rent apartments and improve the search speed and quality by using ElasticSearch. This is being developed for the Software Engineering course (CEN5035) at the University of Florida, Fall 2017.
 
 ## Technology Involved
  - Angular 4
  - Material Design
  - TypeScript
  - NodeJs
  - Express
  - ElasticSearch
  - Protractor
  - Mocha
 
## Installation
  ### Node v4.2.0
  Install node v4.2.0 from https://nodejs.org/en/download/

  ### Elasticsearch v5.3.6
  - Install Elasticsearch v5.3.6 from http://www.elastic.co/downloads/past-releases/elasticsearch-5-6-3
  - Unzip the downloaded zip file into desired location
  - Add the bin floder to the path environment variable

  ### Install Dependencies
  - `npm install` - To install all required node modules
  - `npm install karma -g` - To install Karma globally


 ## How To Run
 1. `npm install` - To install all required node modules
 2. `elasticsearch` - To be run as a service.
 3. `npm start` - To be run in a separate terminal to start the node server 
 4. `ng build` - To be run in a separate terminal to build the angular app
 5. In a browser, go to "localhost:4200" to access the website
 
## Running Front-End Tests
  ### Running unit tests
  Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

  ## Running end-to-end tests
  Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
  Before running the tests make sure you are serving the app via `ng serve`.

## Running Back-End Tests
  - Make sure you have installed mocha globally using command `npm install mocha -g`
  - Go into backend test folder and open the command prompt
  - Run backend tests using command `"npm test"`
  - Run backend tests with code coverage using command `"npm test"`

## Documentation

  ### Back-End Documentation
  - Backend API Documentation https://github.com/DilipKunderu/SEfa17/wiki/Back-end-API

  ## Front-End Docmentation
  - Frontend Documentation wiki https://github.com/DilipKunderu/SEfa17/wiki/Front-end-Documentation.


 ## Team Members
  - Dilip Kunderu
  - Meghana Madineni
  - Pallavi Raman
  - Saptarshi Chakraborty
