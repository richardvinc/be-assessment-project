import { DataSource, Repository } from 'typeorm';

import { Patient } from '../entities/patient.entity';

export class PatientService {
    repository: Repository<Patient>;

    constructor(private readonly db: DataSource) {
        this.repository = db.getRepository(Patient);
    }

    async getAll() {
        throw new Error('Not implemented');
    }

    async getById(id: string) {
        throw new Error('Not implemented');
    }
}
