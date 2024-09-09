import { DataSource, Repository } from 'typeorm';

import { MedicalCertificateDomain } from '../domains/medical-certificate.domain';
import { MedicalCertificateEntity } from '../entities/medical-certificate.entity';

export class MedicalCertificateService {
    repository: Repository<MedicalCertificateEntity>;

    constructor(private readonly db: DataSource) {
        this.repository = this.db.getRepository(MedicalCertificateEntity);
    }

    async getAll() {
        return this.repository.find();
    }

    async getById(id: string) {
        return this.repository.findOneBy({
            id,
        });
    }

    async create(domain: MedicalCertificateDomain) {
        return await this.repository.save(domain.toEntity());
    }

    async createPdf(domain: MedicalCertificateDomain) {
        throw new Error('Not implemented');
    }
}
