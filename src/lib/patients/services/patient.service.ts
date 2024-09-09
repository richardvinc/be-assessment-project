import { DataSource, Repository } from 'typeorm';

import { GetPatientByIDDTO } from '../dtos/get-patient-by-id.dto';
import { Patient } from '../entities/patient.entity';

export class PatientService {
    repository: Repository<Patient>;

    constructor(private readonly db: DataSource) {
        this.repository = db.getRepository(Patient);
    }

    async getAll() {
        return await this.repository.find();
    }

    async getById(dto: GetPatientByIDDTO) {
        return await this.repository.findOneBy({
            id: dto.id,
        });
    }
}
