
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import { UserDto } from './user.interface';
import { Product } from 'src/products/product.entity';

// @Injectable()
// export class UsersService extends TypeOrmCrudService<User>{
//   constructor(@InjectRepository(User) repo){
//       super(repo)
//   }
// }
@Injectable()
export class UsersService {

  async insert(userDetails: UserDto): Promise<User> {
    const userEntity: User = User.create();
    const {firstName,lastName,email,isActive, products } = userDetails;
    userEntity.firstName = firstName;
    userEntity.lastName = lastName;
    userEntity.email = email;
    userEntity.isActive = isActive;

    await User.save(userEntity);
    return userEntity;
  }

  async find(id: number):Promise<User>{
    return await User.findOne({where: {id:id}, relations:['products']});
  }

  async getAll(): Promise<User[]> {
    return await User.find();
  }
  async getProducts(userID: number): Promise<Product[]> {
    console.log(typeof(userID));
    const user: User = await User.findOne({where: {id: userID}, relations: ['products']});
    return user.products;
  }
}