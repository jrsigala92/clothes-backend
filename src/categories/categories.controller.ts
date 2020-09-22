import { Crud, CrudController } from '@nestjsx/crud';
import { Controller, Post, Get, Body,Delete, ParseIntPipe, Param, Put } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';

@Crud({
    model: {
        type: Category
    }
})

@Controller('categories')
export class CategoriesController {
    constructor(public service: CategoriesService){}
    @Post()
    postUser(@Body() category: Category) {
        console.log('entro');
        console.log(category);
        return this.service.save(category);
    }

    // @Put()
    // update(@Body() category: Category) {
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