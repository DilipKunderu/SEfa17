const express = require('express')
const app = express()
var elasticclient = require('./config/database.js');
var routes = require('./api/routes.js');
var dbHelper = require('./api/databasehelper.js');
var bodyParser = require('body-parser');

// need to define body parser before adding the routes so that POST request 
// can access the JOSN data 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use the following route to handle all the API request 
app.use('/', routes);


/* checking for DB connection 
   The server is up only if DB connection is established 
 */
elasticclient.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",status);
    if(status == 200) {
        // starting the server at port 3000
        app.listen(3000, function() {   
            console.log("Server is up at port 3000");
        });
        // create the DB if it does not exist
        dbHelper.dbstart();
    } else {
        console.log("Unable to connect to DB. Shutting down Server !!");
    }
});

module.exports = app;
