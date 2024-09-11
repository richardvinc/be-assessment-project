import { Expose } from 'class-transformer';
import {
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
    @MaxLength(500)
    diagnosis: string;

    @IsString()
    @Expose({ name: 'insurance_name' })
    insuranceName: string;

    @IsString()
    @Expose({ name: 'cost_unit' })
    costUnit: string;

    @IsString()
    @Expose({ name: 'status' })
    status: string;

    @IsString()
    @Expose({ name: 'establishment_no' })
    establishmentNo: string;

    @IsString()
    @Expose({ name: 'datum' })
    datum: string;

    @IsString()
    @Expose({ name: 'nearest_hospital' })
    nearestHospital: string;

    @IsEnum(REPORT_CATEGORY)
    category: REPORT_CATEGORY;
}
