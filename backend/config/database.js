var elasticsearch = require('elasticsearch');
var config = require('./config.json');

var elasticclient = new elasticsearch.Client({
    hosts: [
        config.hostip+":"+config.port
    ]
});

module.exports = elasticclient;