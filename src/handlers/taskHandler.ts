import { Task } from '@prisma/client';
import taskAccess from '@src/dataAccess/taskAccess';
import accountHandler from './accountHandler';

/**
 * Get all tasks.
 */
const getAll = async (accountId: string, userId: string): Promise<Task[]> => {
  const accounts = await accountHandler.getAllUserAccounts(userId);
  if (!accounts.find((account) => account.id === accountId)) {
    throw new Error('User not authorized to access this account');
  }
  return await taskAccess.getAllTasksForAccount(accountId);
};

/**
 * Get one task.
 */

const getOne = async (id: string, userId: string): Promise<Task | null> => {
  const accounts = await accountHandler.getAllUserAccounts(userId);
  const task = await taskAccess.getTaskById(id);

  if (!accounts.find((account) => account.id === task?.accountId)) {
    throw new Error('User not authorized to access this account');
  }
  return task;
};

/**
 * Add one task.
 */

const add = async (userId: string, data: Omit<Task, 'id'>): Promise<Task> => {
  const { accountId, periodicId, ...restData } = data;

  const account = await accountHandler.getOneAccount(accountId, userId);
  if (!account) {
    throw new Error('User not authorized to access this account');
  }
  return await taskAccess.addTask(restData, accountId, periodicId);
};

/**
 * Update one task.
 */

const update = async (
  id: string,
  userId: string,
  data: Omit<Task, 'id'>
): Promise<Task> => {
  const { accountId, periodicId, ...restData } = data;

  const account = await accountHandler.getOneAccount(accountId, userId);
  if (!account) {
    throw new Error('User not authorized to access this account');
  }

  return await taskAccess.updateTask(id, restData);
};

/**
 * Delete one task.
 */

const deleteOne = async (id: string, userId: string): Promise<Task> => {
  const task = await taskAccess.getTaskById(id);

  if (!task) {
    throw new Error('Task not found');
  }

  const account = await accountHandler.getOneAccount(task.accountId, userId);
  if (!account) {
    throw new Error('User not authorized to access this account');
  }

  return await taskAccess.deleteTask(id);
};

export default {
  getAll,
  getOne,
  add,
  update,
  deleteOne,
};
