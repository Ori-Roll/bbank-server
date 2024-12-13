import { Response } from 'supertest';
import type { User } from '@prisma/client';

// Misc
export type TRes = Omit<Response, 'body'> & {
  body: {
    error?: string;
    user?: User;
    users?: User[];
  };
};

export type TApiCb = (res: TRes) => void;
