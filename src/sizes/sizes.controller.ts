import { Crud, CrudController } from '@nestjsx/crud';
import { Controller, Post, Get, Body,Delete, ParseIntPipe, Param, Put } from '@nestjs/common';
import { Size } from './size.entity';
import { SizesService } from './sizes.service';

@Crud({
    model: {
        type: Size
    }
})

@Controller('sizes')
export class SizesController {
    constructor(public service: SizesService){}
    @Post()
    postUser(@Body() size: Size) {
        console.log('entro');
        console.log(size);
        return this.service.save(size);
    }

    // @Put()
    // update(@Body() size: Size) {
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