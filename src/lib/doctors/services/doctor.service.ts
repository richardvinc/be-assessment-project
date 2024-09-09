import { DataSource, Repository } from 'typeorm';

import { DoctorEntity } from '../entities/doctor.entity';

export class DoctorService {
    repository: Repository<DoctorEntity>;

    constructor(private readonly db: DataSource) {
        this.repository = db.getRepository(DoctorEntity);
    }

    async getAll() {
        return this.repository.find();
    }

    async getById(id: string) {
        return this.repository.findOneBy({
            id,
        });
    }
}
