const remote = require('./remote');
const config = require('../cofing');

module.exports = new remote(config.mysqlService.host, config.mysqlService.port)