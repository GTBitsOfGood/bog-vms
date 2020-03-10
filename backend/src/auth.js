// node imports
const crypto = require('crypto');

// npm imports
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Local imports
const UserData = require('./models/userData');

// Password hash config
const PASSWORD_HASH_ITERATIONS = 1000;
const PASSWORD_HASH_LENGTH = 64;
const PASSWORD_HASH_DIGEST = 'sha512';

/**
 * Initializes passport and authentication-related endpoints for the entire express application.
 */
function initAuth(app) {
  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`email` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `done` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(
    new LocalStrategy(function(email, password, done) {
      findUserByEmail(email, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user || !user.login) {
          return done(null, false);
        }
        // perform standard valiation on user login
        if (user.login.type === 'password') {
          // use pre-generated salt from login info (stored in db)
          const { salt, passwordHash } = user.login;
          if (salt == null || passwordHash == null) return done(null, false);
          const hash = crypto
            .pbkdf2Sync(
              password,
              salt,
              PASSWORD_HASH_ITERATIONS,
              PASSWORD_HASH_LENGTH,
              PASSWORD_HASH_DIGEST
            )
            .toString(`hex`);
          if (hash !== passwordHash) return done(null, false);
        }
        return done(null, user);
      });
    })
  );

  function findUserByEmail(email, callback) {
    UserData.findOne({ 'bio.email': email }, callback);
  }

  function findUserById(id, callback) {
    UserData.findOne({ _id: id }, callback);
  }

  // Configure Passport authenticated session persistence.
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    findUserById(id, (err, user) => done(err, user));
  });

  // Middleware to use passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Login Route
  app.post('/auth/login', passport.authenticate('local'), (req, res) => {
    console.log('logged in', req.user);
    res.send({
      email: req.user.bio.email
    });
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

// Generates login object used upon user registration
// Object of form:
/* {
  type: "password",
  salt: "74f32a364a90a4d4",
  passwordHash: "4f1a2096023495b6ff4cdf87..."
} */
function generatePasswordLogin(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto
    .pbkdf2Sync(
      password,
      salt,
      PASSWORD_HASH_ITERATIONS,
      PASSWORD_HASH_LENGTH,
      PASSWORD_HASH_DIGEST
    )
    .toString(`hex`);
  console.log({ password, salt, passwordHash });
  return { type: 'password', salt, passwordHash };
}

module.exports = {
  initAuth,
  generatePasswordLogin,
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
      : res.status(403).json({
          error: 'User not authenticated (must sign in)'
        });
  }
};
