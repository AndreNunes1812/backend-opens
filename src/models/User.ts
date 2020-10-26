import { uuid } from 'uuidv4';

class User {
  id: string;

  login: string;

  password: string;

  name: string;

  email: string;

  constructor({ login, password, name, email }: Omit<User, 'id'>) {
    this.id = uuid();
    this.login = login;
    this.password = password;
    this.name = name;
    this.email = email;
  }
}

export default User;
