var bcrypt = require('bcrypt');

module.exports = {
  encrypt: function(password){
    return new Promise(function(resolve, reject){
      var hash = bcrypt.hashSync(password, 10);
      resolve(hash);
    });
  },
  decrypt: function(password, hash){
    return new Promise(function(resolve, reject){
      resolve(bcrypt.compareSync(password, hash));
    });
  }
}