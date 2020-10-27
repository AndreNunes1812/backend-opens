import { Router } from 'express';
import cors from 'cors';

import bodyParser from 'body-parser';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use(cors());
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
