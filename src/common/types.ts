import { Response, Request } from 'express';

// TODO: Move this somewhere else

// **** Types **** //

export type TObj<B> = Record<string, B>;
export type IReq<B, P = void> = Request<P, TObj<B>, TObj<B>, TObj<B>>;
export type IRes<B> = Response<unknown, TObj<B>>;
