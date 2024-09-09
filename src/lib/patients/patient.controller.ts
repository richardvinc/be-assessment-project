import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

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
        return res.json(await this.patientService.getById(req.params.id));
    }
}
