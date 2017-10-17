'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

const app = require('../server.js'); // Our app

describe('API endpoints', function() {
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
        //console.log(res.body.results)
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

  //59c949b3008f052792a09032000002

  var id;
  it('POST API test-1', function() {
    return chai.request(app)
      .post('/add')
      .send(
        {
          "title": "some title new",
          "owner": "saptarshi chak",
          "location": "gainesville, Florida, USA",
          "zipcode": 32608,
          "description": "brief description about the apartment",
          "rent":"$50",
          "geolocation" : {
                    "lat" : 41.12,
                    "lon" : -70.34
            },
          "details": {
            "accomodates": 1,
            "bathrooms": 1,
            "bathroomtype": "private",
            "bedrooms": 2,
            "studio": false,
            "beds": 2,
            "petfriendly": true,
            "propertytype": "private",
            "roomtype": "private room"
          },
          "amenities": {
            "kitchen": true,
            "internet": false,
            "tv": true,
            "essentials": false,
            "shampoo": true,
            "heating": false,
            "airconditioning": true,
            "washer": true,
            "dryer": true,
            "free_parking_on_premises": true,
            "free_parking_on_street": false,
            "paid_parking_off_premises": false,
            "wireless_internet": true,
            "cable_tv": true,
            "family_or_kid_friendly": true,
            "suitable_for_events": false,
            "smoking_allowed": false,
            "wheelchair_accessible": true,
            "elevator": true,
            "indoor_fireplace": false,
            "buzzer_or_wireless_intercom": false,
            "doorman": false,
            "pool": true,
            "hottub": true,
            "gym": true,
            "hangers": true,
            "laptop_friendly_workspace": true,
            "private_entrance": false,
            "window_guards": false,
            "bathtub": true
          },
          "house_roles": ["No smoking",
            "No parties or events",
            "Check in time is 12PM (noon) - 5PM"
          ]
        }
    )
      .then(function(res) {
        id = res.body._id;
        expect(res).to.have.status(200);
      });
  });


  it('JSON in POST API test-2', function() {
    var newid;
   return chai.request(app)
      .post('/add')
      .send(
        {
          "title": "some title new",
          "owner": "saptarshi chak",
          "location": "gainesville, Florida, USA",
          "zipcode": 32608,
          "description": "brief description about the apartment",
          "geolocation" : {
                    "lat" : 41.12,
                    "lon" : -70.34
            },
          "details": {
            "accomodates": 1,
            "bathrooms": 1,
            "bathroomtype": "private",
            "bedrooms": 2,
            "studio": false,
            "beds": 2,
            "petfriendly": true,
            "propertytype": "private",
            "roomtype": "private room"
          },
          "amenities": {
            "kitchen": true,
            "internet": false,
            "tv": true,
            "essentials": false,
            "shampoo": true,
            "heating": false,
            "airconditioning": true,
            "washer": true,
            "dryer": true,
            "free_parking_on_premises": true,
            "free_parking_on_street": false,
            "paid_parking_off_premises": false,
            "wireless_internet": true,
            "cable_tv": true,
            "family_or_kid_friendly": true,
            "suitable_for_events": false,
            "smoking_allowed": false,
            "wheelchair_accessible": true,
            "elevator": true,
            "indoor_fireplace": false,
            "buzzer_or_wireless_intercom": false,
            "doorman": false,
            "pool": true,
            "hottub": true,
            "gym": true,
            "hangers": true,
            "laptop_friendly_workspace": true,
            "private_entrance": false,
            "window_guards": false,
            "bathtub": true
          },
          "house_roles": ["No smoking",
            "No parties or events",
            "Check in time is 12PM (noon) - 5PM"
          ]
        }
    ).then(function(res) {
        newid = res.body._id;
        expect(res).to.have.status(200);
        chai.request(app)
        .delete('/delete_id?id='+newid)
        .then(function(res) {
          expect(res).to.have.status(200);
        });
       
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

  it('should return all content', function() {
    return chai.request(app)
      .get('/get')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body.hits.total).to.be.greaterThan(0);
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
