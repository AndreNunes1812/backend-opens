import { Router } from 'express';
import UsersRepository from '../repositories/UserRepository';

const usersRouter = Router();
const usersRepository = new UsersRepository();

usersRouter.get('/', (request, response) => {
  const users = usersRepository.all();

  return response.json(users);
});

usersRouter.post('/', (request, response) => {
  const { login, password, name, email } = request.body;

  const user = usersRepository.create({ login, password, name, email });

  return response.json(user);
});

export default usersRouter;
