import { Periodic } from '@prisma/client';
import { getAllPeriodicsForAccount } from '../dataAccess/periodicAccess';

/**
 * Get all users.
 */
const getAll = async (accountId: string): Promise<Periodic[]> => {
  return await getAllPeriodicsForAccount(accountId);
};
