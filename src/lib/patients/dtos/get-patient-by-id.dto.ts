import { IsUUID } from 'class-validator';

export class GetPatientByIDDTO {
    @IsUUID()
    id: string;
}
