var mongoose = require('mongoose'),
    // crypto = require('crypto');
    bcrypt = require('bcrypt');

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
  var UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    salt: String,
    hashed_pwd: String
  });

  UserSchema.methods = {
    authenticate: function functionName(passwordToMatch) {
      console.log(passwordToMatch);
      return bcrypt.compareSync(passwordToMatch, this.hashed_pwd);
    }
  };

  // create a new user model
  var User = mongoose.model('User', UserSchema);

  // create default users;
  User.find({}).exec(function (err, collection) {
    // check if there are documents in the collection, create new users
    if (collection.length === 0) {
      var salt, hash;
      console.log("salting alex...");
      salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync('alex', salt);
      User.create({firstName: "Alex", lastName: "White", username: "alex", salt: salt, hashed_pwd: hash});
      console.log("salting monk...");
      salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync('monk', salt);
      User.create({firstName: "Monk", lastName: "Wellington", username: "monk", salt: salt, hashed_pwd: hash});
      console.log("done salting.");
    }
  });
};
