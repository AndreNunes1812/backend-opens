import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import User from '../models/User';

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const usersRepository = getRepository(User);
  const user = await usersRepository.findOne({ where: { id } });

  const userWithoutPassword = {
    id: user?.id,
    login: user?.login,
    name: user?.name,
    email: user?.email,
  };

  return response.status(200).json(userWithoutPassword);
});

usersRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const usersRepository = getRepository(User);

  const user = await usersRepository.findOne(id);

  if (!user) {
    throw Error('User not found');
  }

  usersRepository.merge(user, request.body);

  const userWithoutPassword = {
    id: user.id,
    login: user.login,
    name: user.name,
    email: user.email,
  };

  await usersRepository.save(user);

  return response.status(200).json(userWithoutPassword);
});

usersRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const usersRepository = getRepository(User);

    const result = await usersRepository.delete(id);

    if (result.affected === 0) {
      throw Error('User not deleted.');
    }

    return response.status(202).json({ message: 'User deleted.' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.post('/', async (request, response) => {
  try {
    const { login, password, name, email } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ login, password, name, email });

    const userWithoutPassword = {
      id: user.id,
      login: user.login,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
