var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);

  require('../models/baby.server.model');
  //require('../models/article.server.model');

  //db.connection.on('error', console.log("Connection to database failed"));
  //db.connection.once('open', console.log("Connection to database succeeded"));

  return db;
};