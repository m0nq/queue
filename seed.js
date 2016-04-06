var mongoose = require('mongoose'),
    conn = mongoose.connect('mongodb://localhost/queue'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User', userSchema);

User.remove({}, function (err) {
  if (err) {
    console.log("ERROR:", err);
  }
});

// create default users;
User.find({}).exec(function (err, collection) {
  if (err) {
    console.error("Error:", err);
  } else if (collection.length === 0) { // check if there are documents in the collection, create new users
    var salt, hash;
    console.log("salting monk...");
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync('monk', salt);
    User.create({firstName: "Monk", lastName: "Wellington", username: "monk", hashed_pwd: hash});
    console.log("salting alex...");
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync('alex', salt);
    User.create({firstName: "Alex", lastName: "White", username: "alex", hashed_pwd: hash});
    console.log("salting christina...");
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync('christina', salt);
    User.create({firstName: "Christina", lastName: "Yueh", username: "christina", hashed_pwd: hash});
    console.log("done salting.");
  }
});

var users = [
 {
    firsName: "Alex",
    lastName: "Wellington",
    username: "monk",
    hashed_pwd: salty()
  },
  {
    firstName: "Alex",
    lastName: "White",
    username: "alex",
    hashed_pwd: salty()
  },
  {
    firstName: "Christina",
    lastName: "Yueh",
    username: "christina",
    hashed_pwd: salty()
  }
];

function salty() {
  var salt, hash;
  salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(this.username, salt);
}

User.create(users, function (err, docs) {
  if (err) {
      console.log("ERROR:", err);
  } else {
      console.log("Created:", docs);
      mongoose.connection.close();
  }
});
