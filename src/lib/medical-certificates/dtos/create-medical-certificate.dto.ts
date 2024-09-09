import { Expose } from 'class-transformer';
import {
    IsDate,
    IsEnum,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';

import { REPORT_CATEGORY } from '../medical-certificate.constant';

export class CreateMedicalCertificateDTO {
    @IsUUID()
    @Expose({ name: 'patient_id' })
    patientId: string;

    @IsUUID()
    @Expose({ name: 'doctor_id' })
    doctorId: string;

    @IsString()
    @MinLength(10)
    @MaxLength(100)
    diagnosis: string;

    @IsDate()
    @Expose({ name: 'start_date' })
    startDate: Date;

    @IsDate()
    @Expose({ name: 'end_date' })
    endDate: Date;

    @IsEnum(REPORT_CATEGORY)
    category: REPORT_CATEGORY;
}
