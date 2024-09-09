import { v4 } from 'uuid';

interface props {
    licenseNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export class DoctorDomain {
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
        return new DoctorDomain(data, id ?? v4());
    }

    static restore(data: props, id: string) {
        return new DoctorDomain(data, id);
    }
}
