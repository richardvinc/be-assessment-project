import { Exclude, Expose } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { MedicalCertificateEntity } from '../../medical-certificates/entities/medical-certificate.entity';

@Entity('patients')
export class PatientEntity {
    constructor(data: Partial<PatientEntity>) {
        Object.assign(this, data);
    }

    @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
    id: string;

    @Column({ name: 'first_name' })
    @Expose({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    @Expose({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'gender' })
    @Expose({ name: 'gender' })
    gender: string;

    @Column({ name: 'date_of_birth', type: 'date' })
    @Expose({ name: 'date_of_birth' })
    dateOfBirth: Date;

    @Column({ name: 'place_of_birth' })
    @Expose({ name: 'place_of_birth' })
    placeOfBirth: string;

    @Column({ name: 'phone_number' })
    @Expose({ name: 'phone_number' })
    phoneNumber: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    @Expose({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    @Exclude()
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        nullable: true,
        default: null,
    })
    @Exclude()
    deletedAt: Date | null;

    @OneToMany(
        () => MedicalCertificateEntity,
        (medicalCertificate) => medicalCertificate.patient
    )
    @Exclude()
    medicalCertificates?: MedicalCertificateEntity[];
}
