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
  return await addPeriodic(data);
};

export default {
  getAll,
  getOne,
  add,
} as const;
