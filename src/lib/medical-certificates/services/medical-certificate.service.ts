import fs from 'fs';
import PDFDocument from 'pdfkit';
import { DataSource, Repository } from 'typeorm';

import { DoctorService } from '@project/lib/doctors/services/doctor.service';
import { PatientService } from '@project/lib/patients/services/patient.service';

import { MedicalCertificateDomain } from '../domains/medical-certificate.domain';
import { MedicalCertificateEntity } from '../entities/medical-certificate.entity';

export class MedicalCertificateService {
    repository: Repository<MedicalCertificateEntity>;

    constructor(
        private readonly db: DataSource,
        private readonly doctorService: DoctorService,
        private readonly patientService: PatientService
    ) {
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
        await this.createPdf(domain);
        return await this.repository.save(domain.toEntity());
    }

    async createPdf(domain: MedicalCertificateDomain) {
        const doctor = await this.doctorService.getById(domain.props.doctorId);
        const patient = await this.patientService.getById(
            domain.props.patientId
        );
        if (!doctor || !patient) {
            throw new Error('Doctor or patient not found');
        }

        const doc = new PDFDocument();
        doc.pipe(
            fs.createWriteStream(
                `${__dirname}/../../../public/pdfs/${domain.id}.pdf`
            )
        );

        doc.text(`Medical Certificate`, 100, 100);
        doc.text(`${doctor.firstName}`, 100, 150);
        doc.text(`${patient.firstName}`, 100, 200);
        doc.end();
    }
}
