/**
 * Load up the project dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');
var url = require('url'); // req.body
var config = require('./config');

/*
 * Create Express app
 */
app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// view engine
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

/*
 * A simple middleware to restrict access to authenticated users.
 */


/*
 * Start listening
 */
var server = app.listen(4000, function() {
	console.log('Daccount Listening on port %d'.green, server.address().port)
});

/*
 * Protected routes
 */

/*
 * Unprotected routes
 */
 var mysql = require('mysql');

 // DB connect
 var connection = mysql.createConnection({
  host     : config.db_host,
  user     : config.db_user,
  password : config.db_password,
  database : config.db_database
 });
// register form
app.get('/register', function(req, res){
 // get rols
 connection.query('SELECT * FROM `rols`' , function(err, rols) {
   res.render('register', {
     url_faccount: config.url_faccount,
     data: {rols:rols}
   });
 });
});
// login form
app.get('/login', function(req, res){
  res.render('login', {
    url_daccount: config.url_daccount
  });
});
