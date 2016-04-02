var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/queue',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    db: 'mongodb://qube:l3v147h4n@ds011860.mlab.com:11860/the-queue',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
};
