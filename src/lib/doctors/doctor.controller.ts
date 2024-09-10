import { GET, route } from 'awilix-express';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

import { BaseController } from '../shared/controller/base.controller';
import { DoctorService } from './services/doctor.service';

@route('/doctors')
export class DoctorController extends BaseController {
    constructor(private readonly doctorService: DoctorService) {
        super();
    }

    @GET()
    async getAll(req: Request, res: Response) {
        return this.successResponse(
            res,
            instanceToPlain(await this.doctorService.getAll())
        );
    }

    @route('/:id')
    @GET()
    async getById(req: Request, res: Response) {
        const obj = await this.doctorService.getById(req.params.id);

        if (!obj) {
            return res.status(404).json({ message: 'Not found' });
        }

        return this.successResponse(res, instanceToPlain(obj));
    }
}
