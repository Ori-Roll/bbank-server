import { IReq, IRes } from '@src/common/types';
import cronHandler from '@src/handlers/cronHandler';

const executeDailyAction = async (req: IReq<null>, res: IRes<null>) => {
  const user = req.user;
  const data = req.body;

  console.log('----------------');
  console.log('Running cron job');
  console.log('----------------');

  //TODO: Authenticate cron job request

  await cronHandler.executePeriodicActions();

  console.log('Handled cron job');
  console.log('------DONE------');

  res
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json({ message: 'Handled cron job' });
};

export default {
  executeDailyAction,
};
