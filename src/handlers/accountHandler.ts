import { Account } from '@prisma/client';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/route-errors';
import accountAccess from '@src/dataAccess/accountAccess';
import userHandler from '@src/handlers/UserHandler';

const getAllUserAccounts = async (userId: string) => {
  console.log('->getAllUserAccounts-> userId is  ', userId);
  const user = await userHandler.getOne(userId);
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }
  return await accountAccess.getAllUserAccounts(userId);
};

const getOneAccount = async (id: string, userId: string) => {
  const user = await userHandler.getOne(userId);
  try {
    if (!user) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
    }
  } catch (error) {
    console.error(error);
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      'Account not found for user'
    );
  }
  return await accountAccess.getOneAccount(id, userId);
};

const getOneAccountByIdOnly = async (id: string) => {
  return await accountAccess.getOneAccountByIdOnly(id);
};

const getManyAccountsByIds = async (ids: string[]) => {
  return await accountAccess.getManyAccountsByIds(ids);
};

const addAccount = async (data: Omit<Account, 'userId'>, userId: string) => {
  const user = await userHandler.getOne(userId);
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }
  const dataWithUserId = { ...data, userId: user.id };
  return await accountAccess.addAccount(dataWithUserId);
};

const updateAccount = async (id: string, data: Account, userId: string) => {
  const account = await accountAccess.getOneAccount(id, userId);
  if (!account || account.userId !== userId) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      'User not authorized to update account'
    );
  }
  return await accountAccess.updateAccount(id, { ...data }, userId);
};

const updateAccountWithIdOnly = async (id: string, data: Partial<Account>) => {
  return await accountAccess.updateAccountWithIdOnly(id, { ...data });
};

const deleteAccount = async (id: string, userId: string) => {
  const user = await userHandler.getOne(userId);
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }

  return await accountAccess.deleteAccount(id);
};

export default {
  getAllUserAccounts,
  getOneAccount,
  getOneAccountByIdOnly,
  addAccount,
  updateAccount,
  updateAccountWithIdOnly,
  getManyAccountsByIds,
} as const;
