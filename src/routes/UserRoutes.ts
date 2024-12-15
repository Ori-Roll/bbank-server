import HttpStatusCodes from '@src/common/HttpStatusCodes';
import Handler from '@src/handlers/UserHandler';
import { User } from '@prisma/client';
import { ValidationErr } from '@src/common/route-errors';
import { IReq, IRes, TObj } from '@src/common/types';
import { getValidate } from '@src/validators/common/getValidate';

// TODO: Move this somewhere else

const userValidator = <P extends boolean = false>(
  obj: P extends true ? TObj<Pick<User, 'id'> & Partial<User>> : TObj<User>
) => {
  if (!obj || typeof obj !== 'object')
    throw new Error('User request body is missing'); //Can this happen?
  if (!obj.user || typeof obj.user !== 'object')
    throw new Error('User object is missing');
  // TODO: Implement zod validation here
  return true;
};

// TODO: Move this somewhere else??

const validators = {
  add: getValidate(userValidator),
  update: getValidate(userValidator<true>),
  delete: getValidate(userValidator),
} as const;

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq<User>, res: IRes<any>) {
  const users = await Handler.getAll();
  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.OK)
    .json({ users });
}

async function getOne(req: IReq<User, { id: string }>, res: IRes<any>) {
  const { id } = req.params;
  const user = await Handler.getOne(id);
  res.status(HttpStatusCodes.OK).json({ user });
}

/**
 * Add one user.
 */
async function add(req: IReq<User>, res: IRes<User>) {
  const { user } = validators.add(req.body);
  await Handler.addOne(user);
  res.status(HttpStatusCodes.CREATED).json({ user });
}

/**
 * Update one user.
 */
async function update(
  req: IReq<Pick<User, 'id'> & Partial<User>>,
  res: IRes<any>
) {
  const { user } = validators.update(req.body);
  await Handler.updateOne(user);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
// async function delete_(req: IReq<User>, res: IRes<any>) {
//   const { id } = validators.delete(req.params);
//   await Handler.delete(id);
//   res.status(HttpStatusCodes.OK).end();
// }

// **** Export default **** //

export default {
  getAll,
  getOne,
  add,
  update,
  // delete: delete_,
} as const;
