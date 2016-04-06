var bcrypt = require('bcrypt');

exports.createHash = function (pwd) {
  return bcrypt.hashSync(pwd, 10);
}
