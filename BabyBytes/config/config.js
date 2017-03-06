var configName = "development";
//configName = process.env.NODE_ENV;

module.exports = require('./env/' + configName + '.js');