import { JsonController, Get, Param } from 'routing-controllers';
import { User } from '../../../Domain/Users/Entity/User';

@JsonController('/user')
export class UserController {
    @Get('/')
    public get(): Array<User> {
        return [new User('Marcin', 'marcin@wadon.net')];
    }
}
