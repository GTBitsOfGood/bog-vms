// npm imports
const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
var LocalStrategy = require('passport-local').Strategy;

// Local imports
const UserCreds = require('./models/userCreds');
const UserData = require('./models/userData');

/**
 * Initializes passport and authentication-related endpoints for the entire express application.
 */
function initAuth(app) {
  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(new LocalStrategy(
    function (username, password, cb) {
      findByUsername(username, function (err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
      });
    }
  ));

  // this is a mock function
  // TODO: replace with function to retrieve user from mongo
  function findByUsername(username, callback) {
    callback(null, { username: 'admin', password: 'admin' });
  }

  // Configure Passport authenticated session persistence.
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (user, cb) {
    cb(null, user);
  });

  // this is a mock function
  // TODO: replace with function to retrieve user from mongo
  function findUserById(id, callback) {
    callback(null, { username: 'admin', password: 'admin' });
  }

  // Middleware to use passport
  app.use(passport.initialize());
  app.use(passport.session());

  // // For saving user creds in cookie
  // passport.serializeUser(({ id }, done) => done(null, id));

  // // For retrieving user creds object from cookie
  // passport.deserializeUser((id, done) => UserData.findById(id, done));

  // // Google Auth config via passport
  // passport.use(
  //   new GoogleTokenStrategy(
  //     {
  //       clientID: process.env.GOOGLE_CLIENT_ID,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET
  //     },
  //     (accessToken, refreshToken, profile, done) => {
  //       UserCreds.findOrCreate(
  //         accessToken,
  //         refreshToken,
  //         profile,
  //         (err, userCred) => {
  //           if (err) return done(err, null);
  //           UserData.findById(userCred.userDataId, (err2, user) => {
  //             return done(err2, user);
  //           });
  //         }
  //       );
  //     }
  //   )
  // );

  // app.post(
  //   '/auth/google',
  //   passport.authenticate('google-token', { session: true }),
  //   (req, res) => {
  //     if (!req.user) {
  //       return res.status(401).json({
  //         error: 'User Not Authenticated'
  //       });
  //     }
  //     return res.status(200).send(JSON.stringify(req.user));
  //   }
  // );

  // Login Route
  app.post('/auth/login', (req, res, next) => {
    console.log("/auth/login called, req body: ")
    console.log(req.body)
    next();
  },
    passport.authenticate('local'),
    (req, res) => {
      console.log("logged in", req.user);
      var userInfo = {
        username: req.user.username,
      };
      res.send(userInfo);
    });

  // Logout Route
  app.get('/auth/logout', (req, res, next) => {
    req.logout();
    req.session.destroy(err => {
      if (err) {
        return next(err);
      }
      // Clears session
      res.clearCookie('connect.sid', { path: '/' });
      return res.sendStatus(200);
    });
  });
}

module.exports = {
  initAuth,
  /**
   * Express middleware to check if current user is authenticated.
   */
  isAuthenticated: (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      return next();
    }
    // return next();
    return req.user
      ? next()
      : res.status(401).json({
        error: 'User not authenticated (must sign in)'
      });
  }
};
