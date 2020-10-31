import { Crud, CrudController } from '@nestjsx/crud';
import { Controller, Post, Get, Body,Delete, ParseIntPipe, Param, Put } from '@nestjs/common';
import { ShoppingCartElem } from './shopping-cart-elem.entity';
import { ShoppingCartElemsService } from './shopping-cart-elems.service';

@Crud({
    model: {
        type: ShoppingCartElem
    }
})

@Controller('shopping-cart')
export class ShoppingCartElemsController {
    constructor(public service: ShoppingCartElemsService){}
    @Post()
    postUser(@Body() shoppingcartelem: ShoppingCartElem) {
        console.log('entro');
        console.log(shoppingcartelem);
        return this.service.save(shoppingcartelem);
    }

    // @Put()
    // update(@Body() classification: Classification) {
    //     return this.service.update();
    // }

    // 'getAll()' returns the list of all the existing users in the database
    @Get()
    getAll() {
        console.log('traerlos');
        return this.service.getAll();
    }

    @Get(':id')
    find(@Param() params ){
        console.log(params.id);
        return this.service.find(params.id);
    }

    @Delete(':id')
    delete(@Param() params){
        return this.service.delete(params.id);
    }
}