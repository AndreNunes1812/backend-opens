import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const message = {
    id: user.id,
    login: user.login,
    name: user.name,
    email: user.email,
  };

  return response.json({ message, token });
});

export default sessionsRouter;
