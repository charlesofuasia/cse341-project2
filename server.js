require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDb = require('./config/dbConnect');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const Mongostore = require('connect-mongo');
const GithubStrategy = require('passport-github2').Strategy;
const port = process.env.PORT || 3000;

connectDb();

app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: Mongostore.create({
      mongoUrl: process.env.DATABASE_URI,
      ttl: 60 * 60,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'],
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization',
  })
);
app.use('/', require('./routes'));

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `You are logged in as ${req.session.user.displayName}`
      : 'You are logged out.'
  );
});

app.get(
  '/oauth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login-failure',
    session: true,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.get('/login-failure', (req, res) => {
  res.send('Log in attempt failed.');
});

app.use((req, res, next) => {
  const error = new Error('Sorry, page not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
  next();
});

mongoose.connection.once('open', () => {
  console.log('Database Connected');
  app.listen(port, () => {
    console.log(`App is listening on PORT:${port}`);
  });
});
