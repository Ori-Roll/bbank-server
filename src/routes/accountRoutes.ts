import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { Account } from '@prisma/client';
import { ValidationErr } from '@src/common/route-errors';
import { IReq, IRes, TObj } from '@src/common/types';
import { useValidator } from '@src/validators/common/getValidate';
import handler from '@src/handlers/accountHandler';

const accountValidator = <P extends boolean = false>(
  obj: P extends true ? TObj<Partial<Account>> : TObj<Account>
) => {
  const { account } = obj;
  if (!account || typeof account !== 'object')
    throw new ValidationErr('Account object missing', account);
  // TODO: Implement zod validation here
  return obj;
};

// TODO: Move this somewhere else??

const validators = {
  add: useValidator(accountValidator),
  update: useValidator(accountValidator<true>),
  delete: useValidator(accountValidator),
} as const;

// **** Functions **** //

/**
 * Get all accounts for user
 */

const getAllUserAccounts = async (req: IReq<void>, res: IRes<Account>) => {
  const user = req.user;

  const accounts = await handler.getAllUserAccounts(user.id);

  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.OK)
    .json({ accounts });
};

const getOneAccount = async (
  req: IReq<Account, { id: string }>,
  res: IRes<Account>
) => {
  const user = req.user;
  const { id } = req.params;

  const account = await handler.getOneAccount(id, user.id);

  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.OK)
    .json({ account });
};

const addAccount = async (req: IReq<Account>, res: IRes<Account>) => {
  const user = req.user;
  const data = req.body;

  const account = await handler.addAccount(data, user.id);

  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.CREATED)
    .json({ account });
};

export default {
  getAllUserAccounts,
  getOneAccount,
  addAccount,
} as const;
