import { Controller, Post, Get, Body, ParseIntPipe, Param, Put, Delete } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UserDto } from './user.interface';
import { throwError } from 'rxjs';

@Crud({
    model: {
        type: User
    }
})

// export class UsersController implements CrudController<User> {
//     constructor(public service: UsersService){}
// }
@Controller('users')
export class UsersController {
    constructor(public usersService: UsersService) { }
    @Post()
    postUser(@Body() user: UserDto) {
        console.log('entro');
        return this.usersService.save(user);
    }
    // 'getAll()' returns the list of all the existing users in the database
    @Get()
    getAll() {
        console.log('traerlos');
        return this.usersService.getAll();
    }

    @Get(':id')
    find(@Param() params ){
        console.log(params.id);
        return this.usersService.find(params.id);
    }

    @Post('signup')
    signUp(@Body() user: UserDto){
        console.log(user);
        this.usersService.findByPhone(user.phone).then((res) => {
            if(!res){
                return this.usersService.save(user);  
            }
        });        
        return throwError('usuario existente');   
    }

    @Post('login')
    logIn(@Body() user: UserDto){
        console.log(user);
        return this.usersService.logIn(user.email, user.password);
    }

    @Delete(':id')
    delete(@Param() params){
        return this.usersService.delete(params.id);
    }
    // @Put('put')
    // save(@Body() userDto: UserDto){
    //     console.log('update');
    //     return null;
    // }

    //'getBooks()' return all the books which are associated with the user 
    // provided through 'userID' by the request  
    // @Get('books')
    // getBooks(@Body('userID', ParseIntPipe) userID: number) {
    //     return this.usersService.getBooksOfUser(userID);
    // }
}