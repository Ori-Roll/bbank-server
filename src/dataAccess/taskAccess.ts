import { Task } from '@prisma/client';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/route-errors';
import { db } from '@src/config/db';

export const getTaskById = async (id: string): Promise<Task | null> => {
  return await db.task.findUnique({
    where: { id },
  });
};

export const getAllTasksForAccount = async (
  accountId: string
): Promise<Task[]> => {
  return await db.task.findMany({
    where: {
      accountId,
    },
  });
};

export const addTask = async (
  data: Omit<Task, 'id' | 'accountId' | 'periodicId'>,
  accountId: string,
  periodicId: string | null
): Promise<Task> => {
  return await db.task.create({
    data: {
      ...data,
      ...(periodicId && { periodic: { connect: { id: periodicId } } }),
      account: {
        connect: {
          id: accountId,
        },
      },
    },
  });
};

export const updateTask = async (
  id: string,
  data: Omit<Task, 'id' | 'accountId' | 'periodicId'>
): Promise<Task> => {
  return await db.task.update({
    where: { id },
    data: data,
  });
};

export const deleteTask = async (id: string): Promise<Task> => {
  return await db.task.delete({
    where: { id },
  });
};

export default {
  getTaskById,
  getAllTasksForAccount,
  addTask,
  updateTask,
  deleteTask,
};
