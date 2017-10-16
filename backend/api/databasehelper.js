var elasticclient = require('../config/database.js');
var ObjectId = require("node-time-uuid");
var rest = require('restler');

// check if DB is present; if not, create a new DB
var dbstart = function() {
    elasticclient.indices.get({
        index:'housing'
    }, function(err,resp, status) {
        if(status == 200) {
            console.log("Database already exists");
        } else {
            createdb();
        }
    });
    
}

// helper function to create new DB
function createdb() {
     elasticclient.indices.create({  
        index: 'housing'
      },function(err,resp,status) {
        if(err) {
          console.log("Unable to create DB");
        }
        else {
          console.log("DB successfully created");
          //createGeoLocationMapping();
        }
      });
}


// this creates the indexing for geo location points in the DB programmatically. 
// Need to integrate this with the main code 
function createGeoLocationMapping() {
    elasticclient.indices.putMapping({  
        index: 'housing',
        type: 'lease',
        body: {
          properties: {
            "geolocation": {
              "type": "geo_point",
            }
          }
        }
      }, (err, resp, status) => {
          if (err) throw err;
          console.log(resp);
      });
}


var dbMetadataInsert = function(req, res, imageFileNames, callback) {
    var uuid = new ObjectId();
    elasticclient.index({
        index: 'housing',
        id: uuid.toString(),
        type: 'leasemetadata',
        body: {
            "searchid":req.body.searchid,
            "title":req.body.title,
            "rent":req.body.rent,
            "geolocation" : {
                "lat" : req.body.lat,
                "lon" : req.body.lon
            },
            "images":imageFileNames
        }
    },function(err,resp,status) {
        console.log(err);
        console.log(resp);
        callback(err, resp);
    });
}

// helper function to insert entry in DB
var dbinsert = function(req, res, callback) {
    var uuid = new ObjectId();
    elasticclient.index({  
        index: 'housing',
        id: uuid.toString(),
        type: 'lease',
        body: {
            "owner": req.body.owner,
            "location": req.body.location,
            "zipcode": req.body.zipcode,
            "description": req.body.description,
            "details": {
                "accomodates": req.body.details.accomodates,
                "bathrooms": req.body.details.bathrooms,
                "bathroomtype": req.body.details.bathroomtype,
                "bedrooms": req.body.details.bedrooms,
                "studio": req.body.details.studio,
                "beds": req.body.details.beds,
                "petfriendly": req.body.details.petfriendly,
                "propertytype": req.body.details.propertytype,
                "roomtype": req.body.details.roomtype
            },
            "amenities": {
                "kitchen": req.body.amenities.kitchen,
                "internet": req.body.amenities.internet,
                "tv": req.body.amenities.tv,
                "essentials": req.body.amenities.essentials,
                "shampoo": req.body.amenities.shampoo,
                "heating": req.body.amenities.heating,
                "airconditioning": req.body.amenities.airconditioning,
                "washer": req.body.amenities.washer,
                "dryer": req.body.amenities.dryer,
                "free_parking_on_premises": req.body.amenities.free_parking_on_premises,
                "free_parking_on_street": req.body.amenities.free_parking_on_street,
                "paid_parking_off_premises": req.body.amenities.free_parking_off_premises,
                "wireless_internet": req.body.amenities.wireless_internet,
                "cable_tv": req.body.amenities.cable_tv,
                "family_or_kid_friendly": req.body.amenities.family_or_kid_friendly,
                "suitable_for_events": req.body.amenities.suitable_for_events,
                "smoking_allowed": req.body.amenities.smoking_allowed,
                "wheelchair_accessible": req.body.amenities.wheelchair_accessible,
                "elevator": req.body.amenities.elevator,
                "indoor_fireplace": req.body.amenities.indoor_fireplace,
                "buzzer_or_wireless_intercom": req.body.amenities.buzzer_or_wireless_intercom,
                "doorman": req.body.amenities.doorman,
                "pool": req.body.amenities.pool,
                "hottub": req.body.amenities.hottub,
                "gym": req.body.amenities.gym,
                "hangers": req.body.amenities.hangers,
                "laptop_friendly_workspace": req.body.amenities.laptop_friendly_workspace,
                "private_entrance": req.body.amenities.private_entrance,
                "window_guards": req.body.amenities.window_guards,
                "bathtub": req.body.amenities.bathtub
            },
            "house_roles": req.body.house_roles
        }
      },function(err,resp,status) {
          console.log(err);
          callback(err, resp);
      } );
}

// check if DB is present; if present, delete the DB
var dbdelete =  function(req, res, callback) {
    elasticclient.indices.get({
        index:'housing'
    }, function(err,resp, status) {
        if(status == 200) {
            console.log("Database does not exist");
        } else {
            deletedb(req, res, callback);
        }
    });   
}

// helper function to delete an existing DB
function deletedb(req, res, callback) {
     elasticclient.indices.delete({  
        index: 'housing'
      },function(err,resp,status) {
        if(err) {
          console.log("Unable to delete DB");
        }
        callback(err, resp);
      });
}

// delete the DB element corresponding to a specific id
var dbdelete_id =  function(input_id, res, callback) {
    elasticclient.delete({  
        index: 'housing',
		type:'lease',
		id: input_id
      }, function(err,resp,status) {
            callback(err, resp);
      });  
}

var dbLeaseMetadataGet = function(req, res, callback) {
    elasticclient.search({
        index:'housing',
        type : 'leasemetadata'
    },	function(err,resp, status) {
		if(err) {
			console.log("Unable to obtain the database"+ err);
		}
		callback(err,resp);
	});  
}

// search for the db and return all documents for an index.
var dbget = function(req, res, callback) {
    elasticclient.search({
        index:'housing',
        type : 'lease'
    },	function(err,resp, status) {
		if(err) {
			console.log("Unable to obtain the database"+ err);
		}
		callback(err,resp);
	});   
}

// search for the db and return all documents with a specific id.
var dbget_id = function(input_id, res, callback) {
    elasticclient.get({
        index:'housing',
		type: 'lease',
		id: input_id
    },	function(err,resp, status) {
		if(err) {
			console.log("Unable to obtain the database");
		}
		callback(err,resp);
	});   
}

// geo location based searching
var dbgetgeo = function(req, res, callback) {
    var jsonData = 
    {
        "query": {
            "bool" : {
                "must" : {
                    "match_all" : {}
                },
                "filter" : {
                    "geo_distance" : {
                        "distance" : "100km",
                        "geolocation" : {
                            "lat" : 40,
                            "lon" : 79
                        }
                    }
                }
            }
        }
    }

    console.log(jsonData.query.bool.filter.geo_distance.distance);
      rest.postJson('http://localhost:9200/housing/leasemetadata/_search?pretty', jsonData).
      on('success', function(data, response) {
        callback(data, response);
      }).
      on('fail', function(data, response) {
        callback(data, response);
      });

}

// functions exposed for other modules
exports.dbstart = dbstart;
exports.dbinsert = dbinsert;
exports.dbdelete = dbdelete;
exports.dbget = dbget;
exports.dbget_id = dbget_id;
exports.dbdelete_id = dbdelete_id;
exports.dbgetgeo = dbgetgeo;
exports.dbMetadataInsert = dbMetadataInsert;
exports.dbLeaseMetadataGet = dbLeaseMetadataGet;

