import { Crud, CrudController } from '@nestjsx/crud';
import { Controller, Post, Get, Body,Delete, ParseIntPipe, Param, Put } from '@nestjs/common';
import { Classification } from './classification.entity';
import { ClassificationsService } from './classifications.service';

@Crud({
    model: {
        type: Classification
    }
})

@Controller('classifications')
export class ClassificationsController {
    constructor(public service: ClassificationsService){}
    @Post()
    postUser(@Body() classification: Classification) {
        console.log('entro');
        console.log(classification);
        return this.service.save(classification);
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