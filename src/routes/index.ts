import { Router } from 'express';

import Paths from './common/Paths';
import userRoutes from './userRoutes';
import accountRoutes from './accountRoutes';
import periodicRoutes from './periodicRoutes';
import cronRoutes from './cronRoutes';

// **** Variables **** //

const apiRouter = Router();

// ** Add UserRouter ** //

// Init router
const userRouter = Router();
const accountRouter = Router();
const periodicRouter = Router();
const cronRouter = Router();

// users routes
userRouter.get(Paths.Users.Me, userRoutes.getMe);
userRouter.get(Paths.Users.GetAll, userRoutes.getAll);
userRouter.get(Paths.Users.Get, userRoutes.getOne);
userRouter.post(Paths.Users.Add, userRoutes.add);
userRouter.put(Paths.Users.Update, userRoutes.update);
// userRouter.delete(Paths.Users.Delete, userRoutes.delete);

// Account routes

accountRouter.get(Paths.Accounts.GetAll, accountRoutes.getAllUserAccounts);
accountRouter.get(Paths.Accounts.Get, accountRoutes.getOneAccount);
accountRouter.post(Paths.Accounts.Add, accountRoutes.addAccount);
accountRouter.patch(Paths.Accounts.Update, accountRoutes.updateAccount);

// Periodic routes
periodicRouter.get(
  Paths.Periodics.GetAll,
  periodicRoutes.getAllPeriodicsForAccount
);
periodicRouter.post(Paths.Periodics.Add, periodicRoutes.addPeriodic);

// Cron routes

cronRouter.get(Paths.Cron.RunDaily, cronRoutes.executeDailyAction);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Accounts.Base, accountRouter);
apiRouter.use(Paths.Periodics.Base, periodicRouter);
apiRouter.use(Paths.Cron.Base, cronRouter);

// **** Export default **** //

export default apiRouter;
