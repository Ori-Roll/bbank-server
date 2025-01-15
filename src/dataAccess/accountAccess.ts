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
      include: {
        periodics: true,
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
  console.log('GOT DATA', data);

  try {
    const account = await db.account.create({
      data,
      include: {
        periodics: true,
      },
    });
    console.log('returning account', account);
    return account;
  } catch (error) {
    console.error(error);
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Could not create account'
    );
  }
};

const deleteAccount = async (id: string) => {
  try {
    const account = await db.account.delete({
      where: { id },
    });
    return account;
  } catch (error) {
    console.error(error);
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Could not delete account'
    );
  }
};

export default {
  getAllUserAccounts,
  getOneAccount,
  addAccount,
  deleteAccount,
} as const;
