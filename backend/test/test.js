'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

const app = require('../server.js'); // Our app

describe('API endpoint /colors', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {

  });

  // GET - From the default path to test the basic test case
  it('should return the welcome message ', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        console.log(res.body.results)
        expect(res).to.have.status(200);
        expect(res.body.results).equal("Hello Gator Housing");
      });
  });

  // GET - Invalid path to test negative test case
  it('should return Not Found', function() {
    return chai.request(app)
      .get('/INVALID_PATH')
      .then(function(res) {
        throw new Error('Path exists!');
      })
      .catch(function(err) {
        expect(err).to.have.status(404);
      });
  });

 
});
