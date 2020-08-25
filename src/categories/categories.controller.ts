import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';

@Crud({
    model: {
        type: Category
    }
})

@Controller('products')
export class CategoriesController implements CrudController<Category> {
    constructor(public service: CategoriesService){}
    
    get base(): CrudController<Category> {
        return this;
    }
}
