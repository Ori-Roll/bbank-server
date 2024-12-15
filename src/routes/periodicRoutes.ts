import { Periodic } from '@prisma/client';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from '@src/common/types';
import handler from '@src/handlers/periodicHandler';

/**
 * Get all periodics.
 */
export const getAllPeriodicsForAccount = async (
  req: IReq<Periodic, { id: string }>,
  res: IRes<Periodic[]>
) => {
  const { id } = req.params;
  // TODO: Implement validation, including checking if the user is authorized to access this data
  // TODO: Implement pagination? Is that necessary in this case?
  const periodics = await handler.getAll(id);
  res
    .setHeader('Content-Type', 'application/json')
    .status(HttpStatusCodes.OK)
    .json({ periodics });
};

/**
 * Get one periodic.
 */

export const getPeriodicById = async (
  req: IReq<Periodic, { id: string }>,
  res: IRes<Periodic>
) => {
  const { id } = req.params;
  const periodic = await handler.getOne(id);
  res.status(HttpStatusCodes.OK).json({ periodic });
};

/**
 * Add one periodic.
 */

export const addPeriodic = async (req: IReq<Periodic>, res: IRes<Periodic>) => {
  const { periodic } = req.body;
  // TODO: Implement validation, including checking if the user has access to the account
  // TODO: Implement validation for the periodic user rules for the account?
  const newPeriodic = await handler.add(periodic);
  res.status(HttpStatusCodes.CREATED).json({ periodic: newPeriodic });
};
