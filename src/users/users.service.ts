
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
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

  async save(userDetails: UserDto): Promise<User> {
    const userEntity: User = userDetails.id ? await User.findOne({where: {id:userDetails.id}}) : User.create();
    const {firstName,lastName,email,isActive, products, password, address, phone } = userDetails;
    userEntity.firstName = firstName;
    userEntity.lastName = lastName;
    userEntity.password = password;
    userEntity.email = email;
    userEntity.address = address;
    userEntity.phone = phone;
    userEntity.isActive = isActive;

    await User.save(userEntity);
    return userEntity;
  }

  async findByPhone(phone: string):Promise<User>{
    return await User.findOne({where: {phone: phone}});
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
  async logIn(username:string, password:string){
    console.log('');
    console.log(username + password);
    const user: User = await User.findOne({where: {phone: username}});
    if(!user) {
      return {token: null, error:'Usuario no encontrado' };
    }
    else if(user.password != password ){
      return {token: null, error:'Password Incorrecto' };
    }
    else {
      return {token:user.id}
    }
  }
  async delete(id: number):Promise<DeleteResult>{
    return await User.delete(id);
  }

}