var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    encrypt = require('../utilities/encryption');

// User Schema contains user basic information such as name, email, password,
// as well as authorization and authentication information
var userSchema = mongoose.Schema({
  firstName: {type: String, required: '{PATH} is required!'},
  lastName: {type: String, required: '{PATH} is required!'},
  username: {
    type: String,
    required: '{PATH} is required!',
    unique: true
  },
  email: String,
  hashed_pwd: {type: String, required: '{PATH} is required!'},
  roles: [String]
});

userSchema.methods = {
  authenticate: function functionName(passwordToMatch) {
    return bcrypt.compareSync(passwordToMatch, this.hashed_pwd);
  },
  hasRole: function (role) {
    return this.roles.indexOf(role) > -1;
  }
};

// create a new user model
var User = mongoose.model('User', userSchema);

// create default users;
function createDefaultUsers() {
  User.find({}).exec(function (err, collection) {
    if (err) {
      console.error("Error:", err);
    } else if (collection.length === 0) { // check if there are documents in the collection, create new users
      var salt, hash;
      console.log("salting alex...");
      hash = encrypt.createHash('white');
      User.create({firstName: "Alex", lastName: "White", email: "alexw@generalassemb.ly", username: "alex", hashed_pwd: hash});
      console.log("salting christina...");
      hash = encrypt.createHash('yeuh');
      User.create({firstName: "Christina", lastName: "Yueh", username: "christina", email: "cjyueh@gmail.com", hashed_pwd: hash});
      console.log("salting monk...");
      hash = encrypt.createHash('wellington');
      User.create({firstName: "Monk", lastName: "Wellington", email: "monq.wellington@gmail.com", username: "monk", hashed_pwd: hash});
      console.log("done salting.");
    }
  });
}

exports.createDefaultUsers = createDefaultUsers;
