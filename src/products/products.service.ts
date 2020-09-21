
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import ProductDto from 'src/dto/create-product.dto';

// @Injectable()
// export class ProductsService extends TypeOrmCrudService<Product>{
//   constructor(@InjectRepository(Product) repo){
//       super(repo)
//   }
// }

@Injectable()
export class ProductsService {
  async insert(productDetails: ProductDto): Promise<Product> {
    const productEntity: Product = Product.create();
    const {name,description,price,available, userID, categoryID, statusID } = productDetails;
    productEntity.name = name ;
    productEntity.description =description;
    productEntity.price = price;
    productEntity.available = available;
    productEntity.userID = userID;
    productEntity.categoryID = categoryID;
    productEntity.statusID = statusID;

    await Product.save(productEntity);
    return productEntity;
  }

  async find(id: number):Promise<Product>{
    return await Product.findOne({where: {id:id}, relations:['category', 'status']});
  }

  async getAll(): Promise<Product[]> {
    return await Product.find({relations:['category','status','user']});
  }
  // async getProducts(productID: number): Promise<Product[]> {
  //   console.log(typeof(productID));
  //   const product: Product = await Product.findOne({where: {id: productID}, relations: ['products']});
  //   return product.products;
  // }
}