import { instanceToPlain } from 'class-transformer';
import { DataSource, Like, Repository } from 'typeorm';

import { PatientDomain } from '../domains/patient.domain';
import { PatientEntity } from '../entities/patient.entity';

export class PatientService {
    repository: Repository<PatientEntity>;

    constructor(private readonly db: DataSource) {
        this.repository = this.db.getRepository(PatientEntity);
    }

    async getAll() {
        return await this.repository.find();
    }

    async getById(id: string) {
        const patient = await this.repository.findOneBy({
            id,
        });

        return patient;
    }

    async findByLastName(name: string) {
        return instanceToPlain(
            await this.repository.find({
                where: {
                    lastName: Like(`%${name}%`),
                },
            })
        );
    }

    async create(domain: PatientDomain) {
        return await this.repository.save(domain.toEntity());
    }
}
