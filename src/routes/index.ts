import { Router } from 'express';

import Paths from './common/Paths';
import userRoutes from './userRoutes';
import accountRoutes from './accountRoutes';
// import periodicRoutes from './PeriodicRoutes';

// **** Variables **** //

const apiRouter = Router();

// ** Add UserRouter ** //

// Init router
const userRouter = Router();
const accountRouter = Router();

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
accountRouter.post(Paths.Accounts.Update, accountRoutes.updateAccount);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Accounts.Base, accountRouter);

// **** Export default **** //

export default apiRouter;
