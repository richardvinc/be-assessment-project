import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Doctor } from '@project/lib/doctors/entities/doctor.entity';
import { Patient } from '@project/lib/patients/entities/patient.entity';

import { REPORT_CATEGORY } from '../medical-certificate.constant';

@Entity('medical_certificates')
export class MedicalCertificate {
    @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
    id: string;

    @Column({ name: 'patient_id' })
    patientId: string;

    @Column({ name: 'doctor_id' })
    doctorId: string;

    @Column({ name: 'diagnosis' })
    diagnosis: string;

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
    deletedAt: Date;

    @ManyToOne(() => Patient, (patient) => patient.medicalCertificates)
    patient: Patient;

    @ManyToOne(() => Doctor, (doctor) => doctor.medicalCertificates)
    doctor: Doctor;
}
