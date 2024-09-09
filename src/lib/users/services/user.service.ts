import { DataSource } from 'typeorm';

import { User } from '@project/entities';

export class UserService {
    constructor(private readonly db: DataSource) {
        console.log('user service initialized');
    }

    async getUsers() {
        return await this.db.getRepository(User).find({});
    }
}
