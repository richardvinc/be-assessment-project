import { DataSource, Repository } from 'typeorm';

import { MedicalCertificate } from '../entities/medical-certificate.entity';

export class MedicalCertificateService {
    repository: Repository<MedicalCertificate>;

    constructor(private readonly db: DataSource) {
        this.repository = db.getRepository(MedicalCertificate);
    }

    async getAll() {
        throw new Error('Not implemented');
    }

    async getById(id: string) {
        throw new Error('Not implemented');
    }
}
