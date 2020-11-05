import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Status } from './status.entity';
import { StatusesService } from './statuses.service';

@Crud({
    model: {
        type: Status
    }
})

@Controller('statuses')
export class StatusesController {
    constructor(public service: StatusesService){}
    @Post()
    postUser(@Body() status: Status) {
        console.log('entro');
        console.log(status);
        return this.service.save(status);
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
