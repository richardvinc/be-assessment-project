import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidationUtils {
    static async validateDto<T extends object>(dto: new () => T, obj: any) {
        const instance = plainToInstance(dto, obj, {
            enableImplicitConversion: true,
        });

        const errors = await validate(instance);

        return { errors, instance };
    }
}
