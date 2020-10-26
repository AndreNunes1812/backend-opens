import User from '../models/User';

class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public all(): User[] {
    return this.users;
  }

  public create(
    login: string,
    password: string,
    name: string,
    email: string,
  ): User {
    const user = new User(login, password, name, email);

    this.users.push(user);

    return user;
  }
}

export default UsersRepository;
