import { Periodic } from '@prisma/client';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/route-errors';
import { db } from '@src/config/db';

const getPeriodicById = async (id: string): Promise<Periodic | null> => {
  return await db.periodic.findUnique({
    where: { id },
  });
};

const getAllPeriodicsForAccount = async (
  accountId: string
): Promise<Periodic[]> => {
  return await db.periodic.findMany({
    where: {
      accountId,
    },
  });
};

const addPeriodic = async (data: Omit<Periodic, 'id'>): Promise<Periodic> => {
  const { accountId, ...modPeriodic } = data;

  return await db.periodic.create({
    data: {
      ...modPeriodic,
      account: {
        connect: {
          id: data.accountId,
        },
      },
    },
  });
};

const updatePeriodic = async (
  id: string,
  data: Partial<Periodic>
): Promise<Periodic> => {
  return await db.periodic.update({
    where: { id },
    data,
  });
};

const deletePeriodic = async (id: string): Promise<Periodic> => {
  return await db.periodic.delete({
    where: { id },
  });
};

const getAllByNextOccurrenceBetweenDates = async (
  minDate: Date,
  maxDate: Date
) => {
  return await db.periodic.findMany({
    where: {
      nextOccurrence: {
        gte: minDate,
        lte: maxDate,
      },
    },
  });
};

export default {
  getPeriodicById,
  getAllPeriodicsForAccount,
  addPeriodic,
  updatePeriodic,
  deletePeriodic,
  getAllByNextOccurrenceBetweenDates,
};
