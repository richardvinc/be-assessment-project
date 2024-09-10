import { GET, POST, route } from 'awilix-express';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

import { BaseController } from '../shared/controller/base.controller';
import { ValidationUtils } from '../utils';
import { PatientDomain } from './domains/patient.domain';
import { CreatePatientDTO } from './dtos/create-patient.dto';
import { FindPatientByName } from './dtos/find-patient-by-name.dto';
import { GetPatientByIDDTO } from './dtos/get-patient-by-id.dto';
import { PatientService } from './services/patient.service';

@route('/patients')
export class PatientController extends BaseController {
    constructor(private readonly patientService: PatientService) {
        super();
    }

    @GET()
    async getAll(req: Request, res: Response) {
        return this.successResponse(
            res,
            instanceToPlain(await this.patientService.getAll())
        );
    }

    @POST()
    async create(req: Request, res: Response) {
        const { errors, instance: dto } = await ValidationUtils.validateDto(
            CreatePatientDTO,
            req.body
        );
        if (errors.length) {
            return res.status(400).json(errors);
        }

        const domain = PatientDomain.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            gender: dto.gender,
            phoneNumber: dto.phoneNumber,
            dateOfBirth: new Date(dto.dateOfBirth),
            placeOfBirth: dto.placeOfBirth,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        });

        return this.successResponse(
            res,
            instanceToPlain(await this.patientService.create(domain))
        );
    }

    @route('/find')
    @GET()
    async findByLastName(req: Request, res: Response) {
        const { errors, instance: dto } = await ValidationUtils.validateDto(
            FindPatientByName,
            req.query
        );
        if (errors.length) {
            return res.status(400).json(errors);
        }

        return this.successResponse(
            res,
            instanceToPlain(await this.patientService.findByLastName(dto.name))
        );
    }

    @route('/:id')
    @GET()
    async getById(req: Request, res: Response) {
        const { errors, instance: dto } = await ValidationUtils.validateDto(
            GetPatientByIDDTO,
            req.params
        );
        if (errors.length) {
            return res.status(400).json(errors);
        }

        const obj = await this.patientService.getById(dto.id);

        if (!obj) {
            return res.status(404).json({ message: 'Not found' });
        }

        return this.successResponse(res, instanceToPlain(obj));
    }
}
