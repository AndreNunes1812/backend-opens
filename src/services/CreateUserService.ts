import User from '../models/User';
import UsersRepository from '../repositories/UserRepository';

interface RequestDTO {
  login: string;
  password: string;
  name: string;
  email: string;
}

class CreateUserService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ login, password, name, email }: RequestDTO): User {
    const user = this.usersRepository.create({
      login,
      password,
      name,
      email,
    });

    return user;
  }
}

export default CreateUserService;
