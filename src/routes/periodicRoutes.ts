import { Periodic } from '@prisma/client';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from '@src/common/types';
import periodicHandler from '@src/handlers/periodicHandler';

/**
 * Get all periodics.
 */
const getAllPeriodicsForAccount = async (
  req: IReq<Periodic, { id: string }>,
  res: IRes<Periodic[]>
) => {
  const { id } = req.params;
  const userId = req.user.id;

  const periodics = await periodicHandler.getAll(id, userId);
  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.OK)
    .json({ periodics });
};

/**
 * Get one periodic.
 */

// export const getPeriodicById = async (
//   req: IReq<Periodic, { id: string }>,
//   res: IRes<Periodic>
// ) => {
//   const { id } = req.params;
//   const periodic = await handler.getOne(id);
//   res
//     .setHeader('Content-Type', 'application/json')
//     .status(HttpStatusCodes.OK)
//     .json({ periodic });
// };

/**
 * Add one periodic.
 */

const addPeriodic = async (req: IReq<Periodic>, res: IRes<Periodic>) => {
  const data = req.body;
  console.log('--->>> periodic', data);
  const userId = req.user.id;

  console.log('userId ', userId);

  const newPeriodic = await periodicHandler.add(userId, data);
  res.status(HttpStatusCodes.CREATED).json({ data: newPeriodic });
};

export default {
  getAllPeriodicsForAccount,
  addPeriodic,
} as const;
