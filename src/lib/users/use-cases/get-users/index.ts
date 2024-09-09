import { container } from '../../../../container';
import { UserService } from '../../services/user.service';

export class GetUsersUseCase {
    userService: UserService;

    constructor() {
        this.userService = container.resolve('userService');
    }

    async execute() {
        return await this.userService.getUsers();
    }
}
