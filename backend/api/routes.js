const express = require('express')
const router = express.Router();
var dbHelper = require('./databasehelper.js');
var rest = require('restler');
var ObjectId = require("node-time-uuid");
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/../uploads')
    },
    filename: function (req, file, cb) {
      cb(null, "image" + '-' + new ObjectId().toString()+"."+file.originalname.split(".")[1]);
    }
  })
  
  var upload = multer({ storage: storage })

// the default route to check if API request is reaching this file
router.get("/", function (req, res) {
    return res.status(200).send({
        results:"Hello Gator Housing"});
});

// POST API to add new entries to database
router.post("/add", function (req, res) {
    dbHelper.dbinsert(req, res, function (err, result) {
        if (err)
            return res.status(400).send("Not added");
        return res.status(200).send(result);
    });
});

// GET API to get entries from database
router.get("/get", function (req, res) {
    //console.log("Accepting GET request");
    dbHelper.dbget(req, res, function (err, result) {
	    if (err)
            return res.status(400).send("Cannot obtain data");
		return res.status(200).send(result);
    });
});

// GET API to get entries with a specific id from database
router.get("/get_id", function (req, res) {
    //console.log("Accepting GET request with specific id"+ req.query.id);
    dbHelper.dbget_id(req.query.id, res, function (err, result) {
	    if (err)
            return res.status(400).send("Cannot obtain data specific to an id");
		return res.status(200).send(result);
    });
});

// DELETE API to delete the database
router.post("/delete", function (req, res) {
    //console.log("Accepting DELETE request");
    dbHelper.dbdelete(req, res, function (err, result) {
        if (err)
            return res.status(400).send("Not deleted");
        else
            return res.status(200).send("Deleted");
    });
});

// DELETE API to delete the database with a specific id
router.delete("/delete_id", function (req, res) {
    //console.log("Accepting DELETE request with a specific id");
    dbHelper.dbdelete_id(req.query.id, res, function (err, result) {
        if (err)
            return res.status(400).send("Not deleted");
        return res.status(200).send("Deleted");
    });
});

router.get("/geosearch", function(req, res) {
    dbHelper.dbgetgeo(req, res, function(err, result) {
        if (err)
            return res.status(400).send("Not Found"+ err);
        else
            return res.status(200).send("Found"+ result);
    })
});

router.get("/geolocation", function(req, res) {
    
      var jsonData = {
        "query": {
            "bool" : {
                "must" : {
                    "match_all" : {}
                },
                "filter" : {
                    "geo_distance" : {
                        "distance" : "120km",
                        "pin.location" : {
                            "lat" : 40,
                            "lon" : -70
                        }
                    }
                }
            }
        }
    };

    console.log(jsonData.query.bool.filter.geo_distance.distance);
    //  rest.postJson('http://localhost:9200/my_locations/location/_search?pretty', jsonData).on('complete', function(data, response) {
      //  console.log(data.hits.hits);
      //});

});

router.post('/leasemetadata', upload.any(), function (req, res, next) {
    var imageFiles = [];
    for(var i=0; i< req.files.length; i++) {
        var sampleFile = req.files[i].filename;
        imageFiles.push(sampleFile);
    }
    console.log(imageFiles);

    dbHelper.dbMetadataInsert(req,res, imageFiles, function(err, result) {
        if (err)
            return res.status(400).send("Not Added"+ err);
        else
            return res.status(200).send("Added"+ result);
    })   
    
  });


  // GET API to get lease metadata from database
router.get("/leasemetadata", function (req, res) {
    dbHelper.dbLeaseMetadataGet(req, res, function (err, result) {
	    if (err)
            return res.status(400).send("Cannot obtain data");
		return res.status(200).send(result.hits.hits);
    });
});

// expose to other modules
module.exports = router;
