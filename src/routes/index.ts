import { Router } from 'express';

import Paths from './common/Paths';
import userRoutes from './userRoutes';
import accountRoutes from './accountRoutes';
import periodicRoutes from './periodicRoutes';
import cronRoutes from './cronRoutes';
import taskRoutes from './taskRoutes';
import parentLockRoutes from './parentLockRoutes';

// **** Variables **** //

const apiRouter = Router();

// ** Add UserRouter ** //

// Init router
const userRouter = Router();
const accountRouter = Router();
const periodicRouter = Router();
const cronRouter = Router();
const taskRouter = Router();
const parentLockRouter = Router();

// users routes
userRouter.get(Paths.Users.Me, userRoutes.getMe);
userRouter.get(Paths.Users.GetAll, userRoutes.getAll);
userRouter.get(Paths.Users.Get, userRoutes.getOne);
userRouter.post(Paths.Users.Add, userRoutes.add);
userRouter.put(Paths.Users.Update, userRoutes.update);

parentLockRouter.get(
  Paths.Users.ParentLock.Get,
  parentLockRoutes.validateParentLock
);
parentLockRouter.post(
  Paths.Users.ParentLock.Add,
  parentLockRoutes.createParentLockWithPinAndQuestion
);
parentLockRouter.patch(
  Paths.Users.ParentLock.Update,
  parentLockRoutes.updateParentLockPinAndQuestion
);
parentLockRouter.delete(
  Paths.Users.ParentLock.Delete,
  parentLockRoutes.deleteParentLock
);

userRouter.use(Paths.Users.ParentLock.Base, parentLockRouter);

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

// Task routes
taskRouter.get(Paths.Tasks.GetAll, taskRoutes.getAllTasksForAccount);
taskRouter.get(Paths.Tasks.Get, taskRoutes.getOneTask);
taskRouter.post(Paths.Tasks.Add, taskRoutes.addTask);
taskRouter.patch(Paths.Tasks.Update, taskRoutes.updateTask);
taskRouter.delete(Paths.Tasks.Delete, taskRoutes.deleteTask);

// Cron routes

cronRouter.get(Paths.Cron.RunDaily, cronRoutes.executeDailyAction);

// use Routes
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Accounts.Base, accountRouter);
apiRouter.use(Paths.Periodics.Base, periodicRouter);
apiRouter.use(Paths.Tasks.Base, taskRouter);
apiRouter.use(Paths.Cron.Base, cronRouter);

// **** Export default **** //

export default apiRouter;
