import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Status } from './status.entity';
import { StatusesService } from './statuses.service';

@Crud({
    model: {
        type: Status
    }
})

@Controller('statuses')
export class StatusesController implements CrudController<Status> {
    constructor(public service: StatusesService){}
    
    get base(): CrudController<Status> {
        return this;
    }
}
