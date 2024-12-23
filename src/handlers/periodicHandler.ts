import { Periodic } from '@prisma/client';
import {
  addPeriodic,
  getAllPeriodicsForAccount,
  getPeriodicById,
} from '@src/dataAccess/periodicAccess';

/**
 * Get all periodics.
 */
const getAll = async (accountId: string): Promise<Periodic[]> => {
  // TODO: check if the user is authorized to access this data
  // TODO: Implement pagination? Is that necessary in this case?

  return await getAllPeriodicsForAccount(accountId);
};

/**
 * Get one periodic.
 */

const getOne = async (id: string): Promise<Periodic | null> => {
  return await getPeriodicById(id);
};

/**
 * Add one periodic.
 */

const add = async (data: Omit<Periodic, 'id'>): Promise<Periodic> => {
  // TODO: impl checking if the user has access to the account
  // TODO: check periodic user rules for the account?
  return await addPeriodic(data);
};

export default {
  getAll,
  getOne,
  add,
} as const;
