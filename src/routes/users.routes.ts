import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
// const usersRepository = new UsersRepository();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const usersRepository = getCustomRepository(UsersRepository);

  const users = await usersRepository.findOne(id);

  if (!users) {
    throw Error('User not found');
  }

  usersRepository.merge(users, request.body);

  const result = await usersRepository.save(users);

  return response.status(204).json(result);
});

usersRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const usersRepository = getCustomRepository(UsersRepository);

    const result = await usersRepository.delete(id);

    if (result.affected === 0) {
      throw Error('User not deleted.');
    }

    return response.status(202).json(result);
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
