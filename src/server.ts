import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import logger from 'jet-logger';
import cors from 'cors';
import passport from 'passport';
import 'express-async-errors';

import BaseRouter from '@src/routes';
import AuthRouter from '@src/routes/authRoutes';

import Paths from '@src/routes/common/Paths';
import Env from '@src/common/Env';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/route-errors';
import { NodeEnvs } from '@src/common/constants';
import { CheckAuthenticated } from './middleware/auth';

// **** Variables **** //

const app = express();

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (Env.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (Env.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5173', // Replace with your allowed origin
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dog cat secret key string bla',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.SESSION_SECRET || 'osis1342y93yr89sjhfkdsbfDSFAF32---D'],
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

app.use('*', CheckAuthenticated);

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

app.use('/auth', AuthRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (Env.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});

// **** Front-End Content **** //

// Set views directory (html)
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Nav to users pg by default
app.get('/', (req: Request, res: Response) => {
  console.log('req.session', req.session);
  console.log('req.session.cookie', req.session.cookie);
  console.log('req.isAuthenticated', req.isAuthenticated());
  console.log('req.user', req.user);
  return res.redirect('/users');
});

// Redirect to login if not logged in.
app.get('/users/login', (_: Request, res: Response) => {
  return res.sendFile('users.html', { root: viewsDir });
});

// **** Export default **** //

export default app;
