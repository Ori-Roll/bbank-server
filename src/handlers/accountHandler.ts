import { Account } from '@prisma/client';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/route-errors';
import accountAccess from '@src/dataAccess/accountAccess';
import userHandler from '@src/handlers/UserHandler';

const getAllUserAccounts = async (userId: string) => {
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

const addAccount = async (data: Omit<Account, 'userId'>, userId: string) => {
  console.log('In addAccount - userId: ', userId);
  const user = await userHandler.getOne(userId);
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }
  const dataWithUserId = { ...data, userId: user.id };
  return await accountAccess.addAccount(dataWithUserId);
};

export default {
  getAllUserAccounts,
  getOneAccount,
  addAccount,
} as const;
