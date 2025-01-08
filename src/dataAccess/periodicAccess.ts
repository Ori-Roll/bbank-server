import { PrismaClient, Periodic } from '@prisma/client';

const prisma = new PrismaClient();

export const getPeriodicById = async (id: string): Promise<Periodic | null> => {
  return await prisma.periodic.findUnique({
    where: { id },
  });
  // TODO: add prismaDisconnect to all data access functions
};

export const getAllPeriodicsForAccount = async (
  accountId: string
): Promise<Periodic[]> => {
  return await prisma.periodic.findMany({
    where: {
      accountId,
    },
  });
};

export const addPeriodic = async (
  data: Omit<Periodic, 'id'>
): Promise<Periodic> => {
  return await prisma.periodic.create({
    data,
  });
};

export const updatePeriodic = async (
  id: string,
  data: Partial<Periodic>
): Promise<Periodic> => {
  return await prisma.periodic.update({
    where: { id },
    data,
  });
};

export const deletePeriodic = async (id: string): Promise<Periodic> => {
  return await prisma.periodic.delete({
    where: { id },
  });
};
