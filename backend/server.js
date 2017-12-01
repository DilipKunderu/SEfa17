const express = require('express')
const app = express();
var elasticclient = require('./config/database.js');
var routes = require('./api/routes.js');
var passport = require('passport');
var cors = require('cors')
var dbHelper = require('./api/databasehelper.js');
var mongoose = require('mongoose');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var configDB = require('./config/mongodatabase.js');
var bodyParser = require('body-parser');

//mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
// need to define body parser before adding the routes so that POST request 
// can access the JOSN data
app.use(cors()); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// required for passport
// app.use(session({
//     secret: 'ilovescotchscotchyscotchscotch', // session secret
//     resave: true,
//     saveUninitialized: true
// }));
//app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session

// use the following route to handle all the API request 
app.use('/', routes);
app.use("/uploads", express.static(__dirname + '/uploads'));


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

