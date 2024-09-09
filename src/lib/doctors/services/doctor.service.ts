import { DataSource, Repository } from 'typeorm';

import { Doctor } from '../entities/doctor.entity';

export class DoctorService {
    repository: Repository<Doctor>;

    constructor(private readonly db: DataSource) {
        this.repository = db.getRepository(Doctor);
    }

    async getAll() {
        throw new Error('Not implemented');
    }

    async getById(id: string) {
        throw new Error('Not implemented');
    }
}
