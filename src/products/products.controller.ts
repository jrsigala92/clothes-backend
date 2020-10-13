import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, ParsedBody } from '@nestjsx/crud';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { EntityManager, getManager } from 'typeorm';
import { Category } from 'src/categories/category.entity';
import ProductDto from 'src/dto/create-product.dto';
import TransactionDto from 'src/dto/transaction.dto';

@Crud({
    model: {
        type: Product
    }
})

@Controller('products')
export class ProductsController {
    constructor(public productsService: ProductsService){}
    
    // get base(): CrudController<Product> {
    //     return this;
    // }

    @Override()
//    async createOne(
//       @ParsedRequest() req: CrudRequest,
//       @ParsedBody() dto: Product,
//     ) {
//         const entityManager = getManager();
//         const { name , userID , available, description, price, categoryID, statusID } = dto;
//         const product = new Product();
//         product.available = available;
//         product.description = description;
//         product.name = name;
//         product.price = price;
//         product.user = await User.findOne(userID);
//         product.category = await Category.findOne(categoryID);
//         product.status = await Category.findOne(statusID);
//         // this.usersService.findOne(dto.userID).then(res => product.user = res);
//       return this.productsService.insert(product);
//     }
    @Post()
    postUser(@Body() product: ProductDto) {
        return this.productsService.save(product);
    }
    // 'getAll()' returns the list of all the existing users in the database
    @Get()
    getAll() {
        console.log('traerlos');
        return this.productsService.getAll();
    }

    @Get(':id')
    find(@Param() params ){
        console.log(params.id);
        return this.productsService.find(params.id);
    }

    @Delete(':id')
    delete(@Param() params){
        return this.productsService.delete(params.id);
    }

    @Post('buy')
    buy(@Body() transaction: TransactionDto){
        return this.productsService.buy(transaction);
    }
    
    @Post('buyWithStripe')
    buyWithStripe(@Body() transaction: TransactionDto){
        return this.productsService.buyWithStripe(transaction);
    }
}
