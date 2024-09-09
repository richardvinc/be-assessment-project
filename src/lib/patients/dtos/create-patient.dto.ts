import { Expose } from 'class-transformer';
import {
    IsDate,
    IsEnum,
    IsNumberString,
    IsString,
    MaxDate,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreatePatientDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @Expose({ name: 'first_name' })
    firstName: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @Expose({ name: 'last_name' })
    lastName: string;

    @MinLength(1)
    @MaxLength(1)
    @IsEnum(['M', 'F'])
    gender: string;

    @IsDate()
    @MaxDate(new Date())
    @Expose({ name: 'date_of_birth' })
    dateOfBirth: Date;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @Expose({ name: 'place_of_birth' })
    placeOfBirth: string;

    @IsNumberString()
    @MinLength(10)
    @MaxLength(15)
    @Expose({ name: 'phone_number' })
    phoneNumber: string;
}
