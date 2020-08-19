import { Controller } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, ParsedBody } from '@nestjsx/crud';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { EntityManager, getManager } from 'typeorm';

@Crud({
    model: {
        type: Product
    }
})

@Controller('products')
export class ProductsController implements CrudController<Product> {
    constructor(public service: ProductsService){}
    
    get base(): CrudController<Product> {
        return this;
    }

    @Override()
   async createOne(
      @ParsedRequest() req: CrudRequest,
      @ParsedBody() dto: Product,
    ) {
        const entityManager = getManager();
        // const user = new User();
        const { name , userID , available, description, price } = dto;
        const product = new Product();
        product.available = available;
        product.description = description;
        product.name = name;
        product.price = price;
        product.user = await User.findOne(userID)
        // this.usersService.findOne(dto.userID).then(res => product.user = res);
      return this.base.createOneBase(req, product);
    }
}
