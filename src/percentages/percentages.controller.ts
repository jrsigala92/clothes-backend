import { Crud, CrudController } from '@nestjsx/crud';
import { Controller, Post, Get, Body, ParseIntPipe, Param, Put, Delete } from '@nestjs/common';
import { Percentage } from './percentages.entity';
import { PercentagesService } from './percentages.service';

@Crud({
    model: {
        type: Percentage
    }
})

@Controller('percentages')
export class PercentagesController {
    constructor(public service: PercentagesService){}
    @Post()
    postUser(@Body() percentage: Percentage) {
        console.log('entro');
        console.log(percentage);
        return this.service.save(percentage);
    }

    // @Put()
    // update(@Body() percentage: Percentage) {
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