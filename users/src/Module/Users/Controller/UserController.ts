import { JsonController, Get, Param } from 'routing-controllers';
import { User } from '../../../Domain/Users/Entity/User';

@JsonController('/user')
export class UserController {
    @Get('/')
    public get(): Array<User> {
        return [new User('Zalogowany Marcin', 'marcin@wadon.net')];
    }

    @Get('/login')
    public login(): Array<User> {
        return [new User('Wylogowany Marcin', 'marcin@wadon.net')];
    }
}
