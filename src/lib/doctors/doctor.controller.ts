import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

import { DoctorService } from './services/doctor.service';

@route('/doctors')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    @GET()
    async getAll(req: Request, res: Response) {
        return res.json(await this.doctorService.getAll());
    }

    @route('/:id')
    @GET()
    async getById(req: Request, res: Response) {
        return res.json(await this.doctorService.getById(req.params.id));
    }
}
