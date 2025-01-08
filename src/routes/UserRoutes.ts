import HttpStatusCodes from '@src/common/HttpStatusCodes';
import handler from '@src/handlers/UserHandler';
import { User } from '@prisma/client';
import { IReq, IRes, TObj } from '@src/common/types';
import { useValidator } from '@src/validators/common/getValidate';
import { ValidationErr } from '@src/common/route-errors';
import { Application } from 'express';

// TODO: Move this somewhere else

const userValidator = <P extends boolean = false>(
  obj: P extends true ? TObj<Partial<User>> : TObj<User>
) => {
  if (!obj.user || typeof obj.user !== 'object')
    throw new ValidationErr('User object', obj.user);
  // TODO: Implement zod validation here
  return obj;
};

// TODO: Move this somewhere else??

const validators = {
  add: useValidator(userValidator),
  update: useValidator(userValidator<true>),
  delete: useValidator(userValidator),
} as const;

// **** Functions **** //

/**
 * Get all users.
 */
const getAll = async (req: IReq<User>, res: IRes<any>) => {
  const users = await handler.getAll();

  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.OK)
    .json({ users });
};

async function getOne(req: IReq<User, { id: string }>, res: IRes<any>) {
  const { id } = req.params;
  const user = await handler.getOne(id);
  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.OK)
    .json({ user });
}

/**
 * Add one user.
 */
const add = async (req: IReq<User>, res: IRes<User>) => {
  const { user } = validators.add(req.body);
  const newUser = await handler.addOne(user);
  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.CREATED)
    .json({ newUser });
};

/**
 * Update one user.
 */
const update = async (
  req: IReq<Partial<User>, { id: string }>,
  res: IRes<User>
) => {
  const { user } = validators.update(req.body);
  const { id } = req.params;
  const updatedUser = await handler.updateOne(id, user);
  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.OK)
    .json({ user: updatedUser });
};

/**
 * Delete one user.
 */
const _delete = async (req: IReq<User, { id: string }>, res: IRes<any>) => {
  const { id } = req.params;
  await handler.delete(id);
  res.status(HttpStatusCodes.OK).end();
};

export default {
  getAll,
  getOne,
  add,
  update,
  delete: _delete,
} as const;
