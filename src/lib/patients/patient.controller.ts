import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

import { ValidationUtils } from '../utils';
import { GetPatientByIDDTO } from './dtos/get-patient-by-id.dto';
import { PatientService } from './services/patient.service';

@route('/patients')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @GET()
    async getAll(req: Request, res: Response) {
        return res.json(await this.patientService.getAll());
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

        return res.json(await this.patientService.getById(dto.id));
    }
}
