var url = require('url')
var mysql = require('mysql');
var config = require('./../config');

module.exports = function(req, res, next){
  // DB connect
  var connection = mysql.createConnection({
   host     : config.db_host,
   user     : config.db_user,
   password : config.db_password,
   database : config.db_database
  });

  connection.query('SELECT * FROM `clientes`' , function(err, clientes) {
    req.clientes = clientes;
    return next();
  });

};
