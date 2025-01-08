import { Account } from '@prisma/client';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/route-errors';
import { IReq, IRes } from '@src/common/types';
import { error } from 'console';
import { NextFunction } from 'express';

//TODO: Move this somewhere else (maybe this should be in an env or something)
const publicRoutes = [
  '/auth/google',
  '/auth/google/callback',
  '/auth/logout',
  '/auth/login',
];

const FE_DEV_URL = 'http://localhost:5173';
function getcookie(req: any) {
  var cookie = req?.headers?.cookie;
  // user=someone; session=mySessionID
  return cookie ? cookie.split('; ') : 'no cookie';
}

export const CheckAuthenticated = (
  req: IReq<unknown>,
  res: IRes<unknown>,
  next: NextFunction
) => {
  // if the route is public
  const parsedUrl = req._parsedUrl.pathname;

  console.log('getcookie(req) is: ', getcookie(req));
  console.log('in checkAuthenticated req.url is: ', parsedUrl);
  if (publicRoutes.includes(parsedUrl)) {
    console.log('!!! publicRoutes');
    return next();
  }

  // authenticated user
  if (req.isAuthenticated()) {
    console.log('!!! isAuthenticated');
    return next();
  }
  // not authenticated
  console.log('!!! not authenticated');
  return res
    .status(HttpStatusCodes.UNAUTHORIZED)
    .json({ message: 'You must be logged in to access this route' });
};
