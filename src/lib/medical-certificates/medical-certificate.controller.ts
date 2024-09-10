import { GET, POST, route } from 'awilix-express';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

import { BaseController } from '../shared/controller/base.controller';
import { ValidationUtils } from '../utils';
import { MedicalCertificateDomain } from './domains/medical-certificate.domain';
import { CreateMedicalCertificateDTO } from './dtos/create-medical-certificate.dto';
import { MedicalCertificateService } from './services/medical-certificate.service';

@route('/medical-certificates')
export class MedicalCertificateController extends BaseController {
    constructor(
        private readonly medicalCertificateService: MedicalCertificateService
    ) {
        super();
    }

    @GET()
    async getAll(req: Request, res: Response) {
        return this.successResponse(
            res,
            instanceToPlain(await this.medicalCertificateService.getAll())
        );
    }

    @route('/:id')
    @GET()
    async getById(req: Request, res: Response) {
        const obj = await this.medicalCertificateService.getById(req.params.id);

        if (!obj) {
            return res.status(404).json({ message: 'Not found' });
        }

        return this.successResponse(res, instanceToPlain(obj));
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
            insuranceName: dto.insuranceName,
            costUnit: dto.costUnit,
            status: dto.status,
            establishmentNo: dto.establishmentNo,
            datum: dto.datum,
            nearestHospital: dto.nearestHospital,
            category: dto.category,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        });

        return this.successResponse(
            res,
            instanceToPlain(await this.medicalCertificateService.create(domain))
        );
    }

    @route('/dummy/pdf')
    @POST()
    async createDummyPdf(req: Request, res: Response) {
        return this.successResponse(
            res,
            await this.medicalCertificateService.createDummyPdf()
        );
    }
}
