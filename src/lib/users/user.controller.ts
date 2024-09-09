import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

import { UserService } from './services/user.service';

@route('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @GET()
    async getUsers(req: Request, res: Response) {
        return res.json(await this.userService.getUsers());
    }
}
