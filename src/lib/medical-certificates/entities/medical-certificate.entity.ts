import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { DoctorEntity } from '../../doctors/entities/doctor.entity';
import { PatientEntity } from '../../patients/entities/patient.entity';
import { REPORT_CATEGORY } from '../medical-certificate.constant';

@Entity('medical_certificates')
export class MedicalCertificateEntity {
    constructor(data: MedicalCertificateEntity) {
        Object.assign(this, data);
    }

    @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
    id: string;

    @Column({ name: 'patient_id' })
    patientId: string;

    @Column({ name: 'doctor_id' })
    doctorId: string;

    @Column({ name: 'diagnosis' })
    diagnosis: string;

    @Column({ name: 'start_date' })
    startDate: Date;

    @Column({ name: 'end_date' })
    endDate: Date;

    @Column({ name: 'category' })
    category: REPORT_CATEGORY;

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
    deletedAt: Date | null;

    @ManyToOne(() => PatientEntity, (patient) => patient.medicalCertificates)
    @JoinColumn({ name: 'patient_id' })
    patient?: PatientEntity;

    @ManyToOne(() => DoctorEntity, (doctor) => doctor.medicalCertificates)
    @JoinColumn({ name: 'doctor_id' })
    doctor?: DoctorEntity;
}
