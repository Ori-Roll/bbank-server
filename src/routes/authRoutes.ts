import { IReq, IRes, TObj } from '@src/common/types';
import { Router } from 'express';
import passport from '@src/config/passport';

const router = Router();

/* Route to start OAuth2 authentication */
router.get(
  '/google',
  passport.authenticate(
    'google',
    {
      scope: ['https://www.googleapis.com/auth/plus.login', 'email', 'profile'],
    },
    (_, res) => {
      res.json({ message: 'Google OAuth2 authentication' });
    }
  )
);

/* Callback route for OAuth2 authentication */

//localhost:5500/auth/google/callback

const FE_DEV_URL = 'http://localhost:5173';

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${FE_DEV_URL}/auth/login`,
    successRedirect: FE_DEV_URL,
  })
);

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(FE_DEV_URL);
  });
});

export default router;
