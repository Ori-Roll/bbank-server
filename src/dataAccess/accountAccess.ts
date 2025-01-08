import { Account } from '@prisma/client';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/route-errors';
import { db } from '@src/config/db';

const getAllUserAccounts = async (userID: string) => {
  try {
    const accounts = await db.account.findMany({
      where: {
        userId: userID,
      },
    });
    return accounts;
  } catch (error) {
    console.error(error);
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Could not get accounts'
    );
  }
};

const getOneAccount = async (id: string, userId: string) => {
  // TODO: Is this the correct way to handle this? (with the userId as a safety check?)
  try {
    const account = await db.account.findUnique({
      where: {
        id,
        userId,
      },
    });
    return account;
  } catch (error) {
    console.error(error);
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Could not get account'
    );
  }
};

const addAccount = async (data: Account) => {
  try {
    const account = await db.account.create({
      data,
    });
    return account;
  } catch (error) {
    console.error(error);
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Could not create account'
    );
  }
};

export default {
  getAllUserAccounts,
  getOneAccount,
  addAccount,
} as const;
