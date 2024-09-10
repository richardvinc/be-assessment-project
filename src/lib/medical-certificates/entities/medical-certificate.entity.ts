import { Exclude, Expose } from 'class-transformer';
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
    @Expose({ name: 'patient_id' })
    patientId: string;

    @Column({ name: 'doctor_id' })
    @Expose({ name: 'doctor_id' })
    doctorId: string;

    @Column({ name: 'diagnosis' })
    @Expose({ name: 'diagnosis' })
    diagnosis: string;

    @Column({ name: 'insurance_name' })
    @Expose({ name: 'insurance_name' })
    insuranceName: string;

    @Column({ name: 'cost_unit' })
    @Expose({ name: 'cost_unit' })
    costUnit: string;

    @Column({ name: 'status' })
    @Expose({ name: 'status' })
    status: string;

    @Column({ name: 'establishment_no' })
    @Expose({ name: 'establishment_no' })
    establishmentNo: string;

    @Column({ name: 'datum' })
    @Expose({ name: 'datum' })
    datum: string;

    @Column({ name: 'nearest_hospital' })
    @Expose({ name: 'nearest_hospital' })
    nearestHospital: string;

    @Column({ name: 'category' })
    @Expose({ name: 'category' })
    category: REPORT_CATEGORY;

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

    @ManyToOne(() => PatientEntity, (patient) => patient.medicalCertificates)
    @JoinColumn({ name: 'patient_id' })
    @Exclude()
    patient?: PatientEntity;

    @ManyToOne(() => DoctorEntity, (doctor) => doctor.medicalCertificates)
    @JoinColumn({ name: 'doctor_id' })
    @Exclude()
    doctor?: DoctorEntity;
}
