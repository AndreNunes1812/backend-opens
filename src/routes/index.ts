import { Router } from 'express';
import cors from 'cors';

import bodyParser from 'body-parser';
import usersRouter from './users.routes';

const routes = Router();

routes.use(cors());
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.use('/users', usersRouter);

export default routes;
