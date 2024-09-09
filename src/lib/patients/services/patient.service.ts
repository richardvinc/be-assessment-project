import { DataSource, Repository } from 'typeorm';

import { PatientEntity } from '../entities/patient.entity';

export class PatientService {
    repository: Repository<PatientEntity>;

    constructor(private readonly db: DataSource) {
        this.repository = db.getRepository(PatientEntity);
    }

    async getAll() {
        return await this.repository.find();
    }

    async getById(id: string) {
        return await this.repository.findOneBy({
            id,
        });
    }
}
