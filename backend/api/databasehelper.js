var elasticclient = require('../config/database.js');
var ObjectId = require("node-time-uuid");
var rest = require('restler');
const crypto = require('crypto');

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
    var dbCreateJson = 
    {
        "mappings": {
            "leasemetadata": {
                "properties": {
                  "geolocation": {
                    "type": "geo_point"
                  },
                  "startdate": {
                    "type":   "date",
                    "format": "yyyy-MM"
                  },
                  "enddate": {
                    "type":   "date",
                    "format": "yyyy-MM"
                  }
                }
            }
        }
    };

    rest.putJson('http://localhost:9200/housing/', dbCreateJson).
        on('success', function(data, response) {
        console.log("Success in creating DB");
        }).
        on('fail', function(data, response) {
            console.log("Failure in creating DB");
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
            "startdate":req.body.startdate,
            "enddate":req.body.enddate,
            "images":imageFileNames
        }
    },function(err,resp,status) {
        callback(err, resp);
    });
}

var dbSignup = function(req, res, callback) {
    

    var uuid = new ObjectId();
    const secret = req.body.password;
    const hash = crypto.createHmac('sha256', 'secret')
                       .update(secret)
                       .digest('hex');
    console.log(hash);
    elasticclient.index({
        index: 'housing',
        id: uuid.toString(),
        type: 'info',
        body: {
            "username":req.body.name,
            "email":req.body.email,
            "password":hash
        }
    },function(err,resp,status) {
        callback(err, resp);
    });
}

var dbLeaseInsert = function(req, res, imageFileNames, callback) {
    var uuid = new ObjectId();
    elasticclient.index({
        index: 'housing',
        id: uuid.toString(),
        type: 'leasemetadata',
        body: {
            "owner":req.body.owner,
            "email":req.body.email,
            "title":req.body.title,
            "zipcode": req.body.zipcode,
            "description": req.body.description,
            "rent":req.body.rent,
            "geolocation" : {
                "lat" : req.body.lat,
                "lon" : req.body.lon
            },
            "startdate":req.body.startdate,
            "enddate":req.body.enddate,
            "images":imageFileNames,
            "roomtype": req.body.roomtype,
            "bathrooms": req.body.bathrooms,
            "bedrooms": req.body.bedrooms,
            "internet": req.body.internet,
            "airconditioning": req.body.airconditioning,
            "washer_dryer": req.body.washer_dryer,
            "free_parking_on_premises": req.bodyfree_parking_on_premises,
            "private_bathroom": req.body.private_bathroom,
            "wheelchair_accessible": req.body.wheelchair_accessible,
            "pool": req.body.pool,
            "gym": req.body.gym
        }
    },function(err,resp,status) {
        callback(err, resp);
    });
}

// check if DB is present; if present, delete the DB
/*var dbdelete =  function(req, res, callback) {
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
}*/

// delete the DB element corresponding to a specific id
var dbdelete_id =  function(input_id, res, callback) {
    elasticclient.delete({  
        index: 'housing',
		type:'leasemetadata',
		id: input_id
      }, function(err,resp,status) {
            callback(err, resp);
      });  
}

var dbLeaseMetadataGet = function(req, res, callback) {
    elasticclient.search({
        index:'housing',
        type : 'leasemetadata',
        size: 1000,
    },	function(err,resp, status) {
		callback(err,resp);
	});  
}

var dbLeaseGet = function(req, res, callback) {
    elasticclient.search({
        index:'housing',
        type : 'leasemetadata',
        size: 1000,
    },	function(err,resp, status) {
		callback(err,resp);
	});  
}

// search for the db and return all documents with a specific id.
var dbget_id = function(input_id, res, callback) {
    elasticclient.get({
        index:'housing',
		type: 'leasemetadata',
		id: input_id
    },	function(err,resp, status) {
		callback(err,resp);
	});   
}

// geo location based searching
var dbgetgeo = function(latval, lonval, res, callback) {
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
    jsonData.query.bool.filter.geo_distance.geolocation.lat=latval;
    jsonData.query.bool.filter.geo_distance.geolocation.lon=lonval;
    //console.log(jsonData.query.bool.filter.geo_distance.distance);
      rest.postJson('http://localhost:9200/housing/leasemetadata/_search?pretty', jsonData).
      on('complete', function(data, response) {
        callback(data, response);
      });
}

var dbGetBetweenDates = function(min, max, res, callback) {
    var jsonData = 
    {
        "query": {
            "bool": {
                "must": [
                    {
                        "range": {
                            "startdate": {
                                "gte": "2017-10"
                            }
                        }
                    },
                    {
                        "range": {
                            "enddate": {
                                "lte": "2018-05"
                            }
                        }
                    }
                ]
            }
        }
    };

    jsonData.query.bool.must[0].range.startdate.gte = min;
    jsonData.query.bool.must[1].range.enddate.lte = max;
    //console.log(jsonData.query.bool.filter.geo_distance.distance);
    rest.postJson('http://localhost:9200/housing/leasemetadata/_search?pretty', jsonData).
    on('complete', function(data, response) {
        callback(data, response);
    });

}

var dbGetBetweenPrice = function(min, max, res, callback) {
    var jsonData = 
    {
        "query": {
            "bool": {
                "must": [
                    {
                        "range": {
                            "rent": {
                                "gte": "0",
                                "lte":"1000"
                            }
                        }
                    }
                ]
            }
        }
    }
    jsonData.query.bool.must[0].range.rent.gte = min;
    jsonData.query.bool.must[0].range.rent.lte = max;

    rest.postJson('http://localhost:9200/housing/leasemetadata/_search?pretty', jsonData).
    on('complete', function(data, response) {
        callback(data, response);
    });
}

/**
 * 
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} callback 
 */
var dbgetMulFilter = function(name, res, callback) {
    var jsonData = 
    {
        "query": {
            "query_string": {
                "query": "(owner:Saptarshi)"
            }
        }
    }
    jsonData.query.query_string.query = "(owner:"+name+")";
    rest.postJson('http://localhost:9200/housing/leasemetadata/_search?pretty', jsonData).
    on('complete', function(data, response) {
        callback(data, response);
    });
}

var dbLogin = function(req, res, callback) {
    var jsonData = 
    {
        "query": {
            "query_string": {
                "query": "(username:sapt)"
            }
        }
    }
    jsonData.query.query_string.query = "(email:"+req.body.email+")";
    rest.postJson('http://localhost:9200/housing/info/_search?pretty', jsonData).
    on('complete', function(data, response) {
        callback(data, response);
    });
}

// functions exposed for other modules
exports.dbstart = dbstart;
//exports.dbdelete = dbdelete;
exports.dbget_id = dbget_id;
exports.dbdelete_id = dbdelete_id;
exports.dbgetgeo = dbgetgeo;
exports.dbMetadataInsert = dbMetadataInsert;
exports.dbLeaseMetadataGet = dbLeaseMetadataGet;
exports.dbgetMulFilter = dbgetMulFilter;
exports.dbGetBetweenDates = dbGetBetweenDates;
exports.dbGetBetweenPrice = dbGetBetweenPrice;
exports.dbLeaseInsert = dbLeaseInsert;
exports.dbLeaseGet = dbLeaseGet;
exports.dbSignup = dbSignup;
exports.dbLogin = dbLogin;

