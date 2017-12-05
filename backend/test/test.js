'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
const app = require('../server.js'); // Our app
var should = require('should'),
supertest = require('supertest');

var request = supertest('localhost:3000');

// describe('lease metadata upload', function() {
//   it('file upload', function(done) {
//     request.post('/lease')
//             .attach('image', './test/1.png')
//             .field('owner', 'Saptarshi')
//             .field('email', 'ssaptarshii@ufl.edu')
//             .field('title', 'sample test')
//             .field('zipcode', '32608')
//             .field('description', 'Apartment near downtown')
//             .field('rent','500')
//             .field('lat','45')
//             .field('lon','90')
//             .field('startdate','2017-11')
//             .field('enddate','2018-05')
//             .field("roomtype", "Shared room")
//             .field("bathrooms", "3")
//             .field("bedrooms", "4")
//             .field("internet", "1")
//             .field("airconditioning", "0")
//             .field("washer_dryer", "1")
//             .field("private_bathroom", "0")
//             .field("wheelchair_accessible", "0")
//             .field("pool", "0")
//             .field("gym", "1")
//             .then(function(res) {
//               console.log(res.body._id);
//               done();
//             });
//   });
// });

describe('API endpoints', function() {

  // GET - From the default path to test the basic test case
  it('should return the welcome message ', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
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

  var id;
  it('POST API test-1', function() {  
    return chai.request(app)
      .post('/lease')
      .attach('image', './test/1.png')
      .field('owner', 'Saptarshi')
      .field('email', 'ssaptarshii@ufl.edu')
      .field('title', 'sample test')
      .field('zipcode', '32608')
      .field('description', 'Apartment near downtown')
      .field('rent','500')
      .field('lat','45')
      .field('lon','90')
      .field('startdate','2017-11')
      .field('enddate','2018-05')
      .field("roomtype", "Shared room")
      .field("bathrooms", "3")
      .field("bedrooms", "4")
      .field("internet", "1")
      .field("airconditioning", "0")
      .field("washer_dryer", "1")
      .field("private_bathroom", "0")
      .field("wheelchair_accessible", "0")
      .field("pool", "0")
      .field("gym", "1")
      .then(function(res) {
        id = res.body._id;
        expect(res).to.have.status(200);
      });
  });


  it('should return all the lease data', function() {
    return chai.request(app)
      .get('/leasemetadata')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });

  it('should return all the lease data', function() {
    return chai.request(app)
      .get('/lease')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });


  it('should return all the elemets within specific price range', function() {
    return chai.request(app)
      .get('/price?min=650&max=800')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });

  it('should return all the elemets within specific date range', function() {
    return chai.request(app)
      .get('/date?min=2017-10&max=2018-05')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });

  it('should return content for the particular id', function() {
    return chai.request(app)
      .get('/get_id?id='+id)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body._id).equal(id);
      });
  });

  it('should return content for the particular user', function() {
    return chai.request(app)
      .get('/mylease?name=Saptarshi')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });

  it('invalid GET request for the particular id', function() {
    return chai.request(app)
      .get('/get_id?id=59c949b3008f052792a09032000003')
      .catch(function(err) {
        expect(err).to.have.status(400);
      });
  });

  it('invalid GET request assertion for the particular id', function() {
    return chai.request(app)
      .get('/get_id?id='+id)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body._id).to.be.not.equal('59c949b3008f052792a09032000003');
      });
  });

  it('DELETE API with specific id', function() {
    return chai.request(app)
      .delete('/delete_id?id='+id)
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });

  it('DELETE API with invaild id', function() {
    return chai.request(app)
      .delete('/delete_id?id=abcd')
      .catch(function(err) {
        expect(err).to.have.status(400);
      });
  });

});
