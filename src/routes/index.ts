import { Router } from 'express';

import Paths from './common/Paths';
import userRoutes from './userRoutes';
import periodicRoutes from './PeriodicRoutes';

// **** Variables **** //

const apiRouter = Router();

// ** Add UserRouter ** //

// Init router
const userRouter = Router();

// users routes
userRouter.get(Paths.Users.GetAll, userRoutes.getAll);
userRouter.get(Paths.Users.Get, userRoutes.getOne);
userRouter.post(Paths.Users.Add, userRoutes.add);
userRouter.put(Paths.Users.Update, userRoutes.update);
// userRouter.delete(Paths.Users.Delete, userRoutes.delete);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// **** Export default **** //

export default apiRouter;
