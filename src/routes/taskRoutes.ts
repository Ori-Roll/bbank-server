import { Task } from '@prisma/client';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from '@src/common/types';
import taskHandler from '@src/handlers/taskHandler';

/**
 * Get all tasks.
 */

const getAllTasksForAccount = async (
  req: IReq<Task, { accountId: string }>,
  res: IRes<Task[]>
) => {
  const { accountId } = req.body;
  const userId = req.user.id;

  const tasks = await taskHandler.getAll(accountId, userId);
  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.OK)
    .json({ tasks });
};

/**
 * Get one task.
 */

const getOneTask = async (req: IReq<Task, { id: string }>, res: IRes<Task>) => {
  const { id } = req.params;
  const userId = req.user.id;

  const task = await taskHandler.getOne(id, userId);
  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.OK)
    .json({ task });
};

/**
 * Add one task.
 */

const addTask = async (req: IReq<Task>, res: IRes<Task>) => {
  const data = req.body;
  const userId = req.user.id;

  const task = await taskHandler.add(userId, data);
  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.CREATED)
    .json({ task });
};

/**
 * Update one task.
 */

const updateTask = async (req: IReq<Task, { id: string }>, res: IRes<Task>) => {
  const data = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  const task = await taskHandler.update(id, userId, data);
  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.OK)
    .json({ task });
};

/**
 * Delete one task.
 */

const deleteTask = async (req: IReq<Task, { id: string }>, res: IRes<Task>) => {
  const { id } = req.params;
  const userId = req.user.id;

  const task = await taskHandler.deleteOne(id, userId);
  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.OK)
    .json({ task });
};

export default {
  getAllTasksForAccount,
  getOneTask,
  addTask,
  updateTask,
  deleteTask,
} as const;
