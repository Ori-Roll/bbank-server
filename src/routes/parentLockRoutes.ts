import { ParentLock } from '@prisma/client';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from '@src/common/types';
import parentLockHandler from '@src/handlers/parentLockHandler';

const validateParentLock = async (
  req: IReq<null, { pin: number }>,
  res: IRes<null>
) => {
  const userId = req.user.id;

  const { pin: reqPin } = req.params;

  if (!reqPin || isNaN(Number(reqPin))) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({ status: 'invalid' });
    return;
  }

  const pin = Number(reqPin);

  console.log('pin', pin);
  const validated = await parentLockHandler.validateParentLock(userId, pin);

  if (!validated) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({ status: 'invalid' });
    return;
  }

  res.status(HttpStatusCodes.OK).json({ status: 'validated' });
};

const createParentLockWithPinAndQuestion = async (
  req: IReq<Pick<ParentLock, 'pin' | 'question' | 'answer'>>,
  res: IRes<null>
) => {
  const userId = req.user.id;
  const data = req.body;

  await parentLockHandler.createParentLockWithPinAndQuestion(userId, data);

  res.status(HttpStatusCodes.CREATED).json({ status: 'created' });
};

const updateParentLockPinAndQuestion = async (
  req: IReq<Pick<ParentLock, 'pin' | 'question' | 'answer'>>,
  res: IRes<null>
) => {
  const userId = req.user.id;
  const data = req.body;

  await parentLockHandler.updateParentLockPinAndQuestion(userId, data);

  res.status(HttpStatusCodes.OK).json({ status: 'updated' });
};

const deleteParentLock = async (req: IReq<null>, res: IRes<null>) => {
  const userId = req.user.id;

  await parentLockHandler.deleteParentLock(userId);

  res.status(HttpStatusCodes.OK).json({ status: 'deleted' });
};

export default {
  validateParentLock,
  createParentLockWithPinAndQuestion,
  updateParentLockPinAndQuestion,
  deleteParentLock,
};
