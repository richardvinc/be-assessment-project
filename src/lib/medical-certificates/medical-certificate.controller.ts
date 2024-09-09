import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

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
}
