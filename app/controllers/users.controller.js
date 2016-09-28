var mongoose = require('mongoose'),
    User = require('../models/users.model'),
    passport = require('passport'),
    password = require('../password');

module.exports = {
  signup: function(req, res){
    var user = new User(req.body);
    user.provider = 'local';

    //encrypt password before saving it into DB
    password.encrypt(user.password).then(function(hash, error){
      user.password = hash;
      user.save(function(err, user){
        if(err){
          return res.status(400).send(err);
        }
        else {
          user.password = undefined;
          req.login(user, function(err){
            if(err){
              res.status(400).send(err);
            }
            else {
              res.json(user);
            }
          });
        }
      });
    });
  },
  login: function(req, res, next){
    passport.authenticate('local', function(err, user, info){
      if(err || !user){
        res.status(400).send(info);
      }
      else{
        //password doesn't need to be sent with the rest of the user info
        user.password = undefined;
        req.login(user, function(err){
          if(err){
            res.status(400).send(err);;
          }
          else {
            res.json(user);
          }
        })
      }
    })(req, res, next);
  },
  logout: function(req, res){
    req.logout();
    res.redirect('/');
  },
  authenticate: function(req, res, next){
    //check if we have a signed in user
    if(!req.isAuthenticated()){
      res.json({
        message: 'User is not logged in'
      })
      return;
    }
    next();
  }
}