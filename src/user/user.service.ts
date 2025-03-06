import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

const db = [
  {
    id: 1,
    name: "Ahmed",
    email: "a@gmail.com",
    phoneNumber: "01000000000"
  },
  {
    id: 2,
    name: "Ali",
    email: "ali@gmail.com",
  }
];

@Injectable()
export class UserService {
  create(createUserInput: CreateUserInput) {
    const user = { ...createUserInput, id: Date.now() };
    db.push(user);
    return user;
  }

  findAll() {
    return {
      statue: 200,
      data: db,
      count: db.length,
    };
  }

  findOne(userId: string) {
    const userIndex = db.findIndex(({ id }) => id === +userId);
    if (userIndex === -1) {
      throw new NotFoundException(`Not Found User on this id: ${userId}`);
    }

    return db[userIndex];
  }

  update(userId: string, updateUserInput: UpdateUserInput) {
    const userIndex = db.findIndex(({ id }) => id === +userId);
    if (userIndex === -1) {
      throw new NotFoundException(`Not Found User on this id: ${userId}`);
    }
    db[userIndex] = {...db[userIndex],...updateUserInput, id: +updateUserInput.id };
    return db[userIndex];
  }

  remove(userId: string) {
    const userIndex = db.findIndex(({ id }) => id === +userId);
    if (userIndex === -1) {
      throw new NotFoundException(`Not Found User on this id: ${userId}`);
    }
    db.splice(userIndex, 1);
  }
}
