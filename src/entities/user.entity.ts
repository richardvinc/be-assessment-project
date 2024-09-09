import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}
