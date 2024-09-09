import { GET, POST, route } from 'awilix-express';
import { Request, Response } from 'express';

import { ValidationUtils } from '../utils';
import { MedicalCertificateDomain } from './domains/medical-certificate.domain';
import { CreateMedicalCertificateDTO } from './dtos/create-medical-certificate.dto';
import { MedicalCertificateService } from './services/medical-certificate.service';

@route('/medical-certificates')
export class MedicalCertificateController {
    constructor(
        private readonly medicalCertificateService: MedicalCertificateService
    ) {}

    @GET()
    async getAll(req: Request, res: Response) {
        return res.json(await this.medicalCertificateService.getAll());
    }

    @route('/:id')
    @GET()
    async getById(req: Request, res: Response) {
        return res.json(
            await this.medicalCertificateService.getById(req.params.id)
        );
    }

    @POST()
    async createMedicalCertificate(req: Request, res: Response) {
        const { errors, instance: dto } = await ValidationUtils.validateDto(
            CreateMedicalCertificateDTO,
            req.body
        );

        if (errors.length) {
            return res.status(400).json({ errors });
        }

        const domain = MedicalCertificateDomain.create({
            doctorId: dto.doctorId,
            patientId: dto.patientId,
            diagnosis: dto.diagnosis,
            startDate: dto.startDate,
            endDate: dto.endDate,
            category: dto.category,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        });

        return res.json(await this.medicalCertificateService.create(domain));
    }

    @route('/dummy/pdf')
    @POST()
    async createDummyPdf(req: Request, res: Response) {
        return res.json(await this.medicalCertificateService.createDummyPdf());
    }
}
