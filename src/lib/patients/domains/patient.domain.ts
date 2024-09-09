import { v4 } from 'uuid';

import { PatientEntity } from '../entities/patient.entity';

interface props {
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: Date;
    placeOfBirth: string;
    phoneNumber: string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

type updateableProps = Partial<Pick<props, 'phoneNumber'>>;

export class PatientDomain {
    private _id: string;
    private _props: props;

    constructor(data: props, id: string) {
        Object.assign(this, { _props: data, _id: id });
    }

    get id() {
        return this._id;
    }

    get props() {
        return this._props;
    }

    static create(data: props, id?: string) {
        return new PatientDomain(data, id ?? v4());
    }

    static restore(data: props, id: string) {
        return new PatientDomain(data, id);
    }

    update(data: updateableProps) {
        this._props = { ...this._props, ...data, updatedAt: new Date() };
    }

    toEntity(): PatientEntity {
        return new PatientEntity({
            id: this._id,
            firstName: this._props.firstName,
            lastName: this._props.lastName,
            gender: this._props.gender,
            phoneNumber: this._props.phoneNumber,
            placeOfBirth: this._props.placeOfBirth,
            dateOfBirth: this._props.dateOfBirth,

            createdAt: this._props.createdAt,
            updatedAt: this._props.updatedAt,
            deletedAt: this._props.deletedAt,
        });
    }
}
