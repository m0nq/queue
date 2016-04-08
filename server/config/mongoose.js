var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    courseModel = require('../models/Course');

//////////////////////
// Mongoose/MongoDB //
//////////////////////
module.exports = function (config) {
  // connect to the Mongo database
  mongoose.connect(config.db);
  var db = mongoose.connection;
  // listen for errors
  db.on('error', function (err) {
    console.error('connection error: ', err);
  });

  db.once('open', function callback() {
    console.log('Queue db is now open...');
  });

  userModel.createDefaultUsers();
  courseModel.createDefaultCourses();
};
