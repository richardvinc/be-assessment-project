import { v4 } from 'uuid';

import { MedicalCertificateEntity } from '../entities/medical-certificate.entity';
import { REPORT_CATEGORY } from '../medical-certificate.constant';

interface props {
    patientId: string;
    doctorId: string;
    diagnosis: string;
    insuranceName: string;
    costUnit: string;
    status: string;
    establishmentNo: string;
    datum: string;
    nearestHospital: string;
    category: REPORT_CATEGORY;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

type updateableProps = Partial<
    Pick<
        props,
        | 'diagnosis'
        | 'costUnit'
        | 'establishmentNo'
        | 'nearestHospital'
        | 'status'
        | 'category'
    >
>;

export class MedicalCertificateDomain {
    private _id: string;
    private _props: props;

    private constructor(data: props, id: string) {
        Object.assign(this, { _props: data, _id: id });
    }

    get id() {
        return this._id;
    }

    get props() {
        return this._props;
    }

    static create(data: props, id?: string) {
        return new MedicalCertificateDomain(data, id ?? v4());
    }

    static restore(data: props, id: string) {
        return new MedicalCertificateDomain(data, id);
    }

    update(data: updateableProps) {
        this._props = { ...this._props, ...data, updatedAt: new Date() };
    }

    toEntity(): MedicalCertificateEntity {
        return new MedicalCertificateEntity({
            id: this._id,
            doctorId: this._props.doctorId,
            patientId: this._props.patientId,
            category: this._props.category,
            diagnosis: this._props.diagnosis,
            insuranceName: this._props.insuranceName,
            costUnit: this._props.costUnit,
            status: this._props.status,
            establishmentNo: this._props.establishmentNo,
            datum: this._props.datum,
            nearestHospital: this._props.nearestHospital,
            createdAt: this._props.createdAt,
            updatedAt: this._props.updatedAt,
            deletedAt: this._props.deletedAt,
        });
    }
}
