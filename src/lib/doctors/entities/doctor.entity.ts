import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { MedicalCertificate } from '@project/lib/medical-certificates/entities/medical-certificate.entity';

@Entity('doctors')
export class Doctor {
    @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
    id: string;

    @Column({ name: 'employee_id' })
    employeeId: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'date_of_birth', type: 'date' })
    dateOfBirth: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        nullable: true,
        default: null,
    })
    deletedAt: Date;

    @OneToMany(
        () => MedicalCertificate,
        (medicalCertificate) => medicalCertificate.doctor
    )
    medicalCertificates: MedicalCertificate[];
}
