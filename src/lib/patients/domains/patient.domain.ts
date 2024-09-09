import { v4 } from 'uuid';

interface props {
    firstName: string;
    lastName: string;
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
}
