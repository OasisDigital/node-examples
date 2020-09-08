import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  checkUserValidToLogIn(
    username: string,
    password: string
  ): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username, password },
    });
    // In a real application: check if the user is expired
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User(
      userDto.username,
      userDto.password,
      userDto.role
    );
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result: DeleteResult = await this.usersRepository.delete(
      id
    );
    console.log(result);
  }
}
