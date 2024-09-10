import { Response } from 'express';

export class BaseController {
    successResponse(res: Response, data: any) {
        return res.json({ data, status_code: 200 });
    }
}
