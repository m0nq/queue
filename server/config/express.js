var express = require('express'),
    stylus = require('stylus'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    logger = require('morgan'),
    methodOverride = require('method-override');

////////////////////
// CONFIGURATIONS //
////////////////////
module.exports = function (app, config) {
  app.set('views', config.rootPath + '/server/views');
  app.set('view engine', 'jade');

  // override with different headers; last one takes precedence
  app.use(methodOverride('X-HTTP-Method'));          // Microsoft
  app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
  app.use(methodOverride('X-Method-Override'));      // IBM

  // colored console logging
  app.use(logger('dev'));

  // passport middleware setup with express cookie parser and sessions
  app.use(cookieParser());
  app.use(session({
    secret: 'multi vision unicorns',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

  // stylus middleware
  app.use(stylus.middleware({
    src: config.rootPath + '/public',
    compile: function (str, path) {
      return stylus(str).set('filename', path);
    }
  }));

  // static routes
  app.use(express.static(config.rootPath + '/public'));
};
