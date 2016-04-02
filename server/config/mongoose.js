var mongoose = require('mongoose');

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

  // User Schema contains user basic information such as name, email, password,
  // as well as authorization and authentication information
  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String
  });

  // create a new user model
  var User = mongoose.model('User', userSchema);

  // create default users;
  User.find({}).exec(function (err, collection) {
    // check if there are documents in the collection, create new users
    if (collection.length === 0) {
      User.create({firstName: "Jessie", lastName: "Hong", userName: "JH" });
      User.create({firstName: "Alex", lastName: "White", userName: "AW" });
      User.create({firstName: "Jasmine", lastName: "Martin", userName: "JM" });
      User.create({firstName: "Monk", lastName: "Wellington", userName: "MW" });
    }
  });
};
