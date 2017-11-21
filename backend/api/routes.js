const express = require('express')
const router = express.Router();
var dbHelper = require('./databasehelper.js');
var rest = require('restler');
var ObjectId = require("node-time-uuid");
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../uploads')
    },
    filename: function (req, file, cb) {
        cb(null, "image" + '-' + new ObjectId().toString() + "." + file.originalname.split(".")[1]);
    }
})

var upload = multer({ storage: storage })

// the default route to check if API request is reaching this file

router.get("/", function (req, res) {
    return res.status(200).send({
        results: "Hello Gator Housing"
    });
});

// POST API to add new entries to database
router.post("/add", function (req, res) {
    dbHelper.dbinsert(req, res, function (err, result) {
        if (err)
            return res.status(400).send("Not added");
        return res.status(200).send(result);
    });
});

router.post('/lease', upload.any(), function (req, res, next) {
    console.log(req.body.rent);
    var imageFiles = [];
    for (var i = 0; i < req.files.length; i++) {
        var sampleFile = req.files[i].filename;
        imageFiles.push(sampleFile);
    }
    //console.log(imageFiles);

    dbHelper.dbLeaseInsert(req, res, imageFiles, function (err, result) {
        if (err)
            return res.status(400).send("Not Added" + err);
        else
            return res.status(200).send("Added" + result);
    })
});

router.post('/leasemetadata', upload.any(), function (req, res, next) {
    console.log(req.body.rent);
    var imageFiles = [];
    for (var i = 0; i < req.files.length; i++) {
        var sampleFile = req.files[i].filename;
        imageFiles.push(sampleFile);
    }
    //console.log(imageFiles);

    dbHelper.dbMetadataInsert(req, res, imageFiles, function (err, result) {
        if (err)
            return res.status(400).send("Not Added" + err);
        else
            return res.status(200).send("Added" + result);
    })
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

// GET API to search points within a fixed radius of a point
router.get("/geosearch", function (req, res) {
    dbHelper.dbgetgeo(req.query.lat, req.query.lon, res, function (data, response) {
        //console.log(response);
        if (response.statusCode != 200)
            return res.status(400).send("Not Found");
        else
            return res.status(200).send(data.hits.hits);
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

// GET API to get lease metadata from database
router.get("/lease", function (req, res) {
    dbHelper.dbLeaseGet(req, res, function (err, result) {
        if (err)
            return res.status(400).send("Cannot obtain data");
        return res.status(200).send(result.hits.hits);
    });
});

// GET API to query based on multiple filters
router.get("/mulfilters", function (req, res) {
    dbHelper.dbgetMulFilter(req, res, function (data, response) {
        //console.log(data.hits);
        if (response.statusCode != 200)
            return res.status(400).send("Not Found");
        return res.status(200).send(data.hits.hits);
    });
});


router.get("/date", function(req, res) {
    dbHelper.dbGetBetweenDates(req.query.min, req.query.max, res, function (data, response) {
        //console.log(response);
        if (response.statusCode != 200)
            return res.status(400).send("Not Found");
        else
            return res.status(200).send(data.hits.hits);
    })
});

router.get("/price", function(req, res) {
    dbHelper.dbGetBetweenPrice(req.query.min, req.query.max, res, function (data, response) {
        //console.log(response);
        if (response.statusCode != 200)
            return res.status(400).send("Not Found");
        else
            return res.status(200).send(data.hits.hits);
    })
});

// Commenting the following API for now; this will be used once database insert 
// scripts are ready to automate the insert part

// DELETE API to delete the database
/*router.post("/delete", function (req, res) {
    //console.log("Accepting DELETE request");
    dbHelper.dbdelete(req, res, function (err, result) {
        if (err)
            return res.status(400).send("Not deleted");
        else
            return res.status(200).send("Deleted");
    });
});*/

// DELETE API to delete the database with a specific id
router.delete("/delete_id", function (req, res) {
    //console.log("Accepting DELETE request with a specific id");
    dbHelper.dbdelete_id(req.query.id, res, function (err, result) {
        if (err)
            return res.status(400).send("Not deleted");
        return res.status(200).send("Deleted");
    });
});
module.exports = function(app, passport) {


// LOGOUT ==============================
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    

    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));
// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/home');
        });
    });


    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/home');
        });
    });


};
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
// expose to other modules
module.exports = router;
