import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import UsersRepository from '../repositories/UserRepository';

interface RequestDTO {
  login: string;
  password: string;
  name: string;
  email: string;
}

class CreateUserService {
  public async execute({
    login,
    password,
    name,
    email,
  }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      login,
      password: hashedPassword,
      name,
      email,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
