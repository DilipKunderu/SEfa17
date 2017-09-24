const express = require('express')
const router = express.Router();
var dbHelper = require('./databasehelper.js');

// the default route to check if API request is reaching this file
router.get("/", function (req, res) {
    res.send("Hello Gator Housing");
});

// POST API to add new entries to database
router.post("/add", function (req, res) {
    console.log("Accepting POST request");
    dbHelper.dbinsert(req, res, function (err, result) {
        if (err)
            return res.status(400).send("Not added");
        else
            return res.status(200).send("Added");
    });
});

// expose to other modules
module.exports = router;