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
  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    hashed_pwd: String,
    roles: [String]
  });

  userSchema.methods = {
    authenticate: function functionName(passwordToMatch) {
      return bcrypt.compareSync(passwordToMatch, this.hashed_pwd);
    }
  };

  // create a new user model
  var User = mongoose.model('User', userSchema);

  // create default users;
  User.find({}).exec(function (err, collection) {
    if (err) {
      console.error("Error:", err);
    } else if (collection.length === 0) { // check if there are documents in the collection, create new users
      var salt, hash;
      console.log("salting alex...");
      hash = createHash('white');
      User.create({firstName: "Alex", lastName: "White", username: "alex", hashed_pwd: hash, roles: ['admin']});
      console.log("salting christina...");
      hash = createHash('yeuh');
      User.create({firstName: "Christina", lastName: "Yueh", username: "christina", hashed_pwd: hash, roles: []});
      console.log("salting monk...");
      hash = createHash('wellington');
      User.create({firstName: "Monk", lastName: "Wellington", username: "monk", hashed_pwd: hash});
      console.log("done salting.");
    }
  });
};

function createHash(pwd) {
  return bcrypt.hashSync(pwd, 10);
}
