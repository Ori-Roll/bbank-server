import session from 'express-session';

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || 'dog cat secret key string bla',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
});

export default sessionConfig;
