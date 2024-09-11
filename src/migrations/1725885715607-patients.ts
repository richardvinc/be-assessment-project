import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Patient1725885715607 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'patients',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                    },
                    {
                        name: 'gender',
                        type: 'char',
                    },
                    {
                        name: 'date_of_birth',
                        type: 'date',
                    },
                    {
                        name: 'place_of_birth',
                        type: 'varchar',
                    },
                    {
                        name: 'phone_number',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamptz',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamptz',
                        default: 'now()',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamptz',
                        isNullable: true,
                        default: null,
                    },
                ],
            })
        );

        await queryRunner.query(`
            INSERT INTO public.patients
            (id, first_name, last_name, gender, date_of_birth, place_of_birth, phone_number, created_at, updated_at)
            VALUES ('20a0b281-4d43-4832-a6d2-c0fa22cb33d4', 'Lala', 'Jessica', 'F', '1988-05-05', 'Jakarta', '6281234567890', now(), now()),
            ('5bf7397d-2dc2-4dab-843e-625c9720d37b', 'Lulu', 'John', 'M', '1998-11-13', 'Texas', '6281424567890', now(), now()),
            ('5d8e4930-f049-419e-b69f-59c181e32502', 'Lele', 'David', 'M', '2000-07-12', 'Sinapore', '6281239967890', now(), now()),
            ('febb6ccb-5bce-42b9-a84a-b525ef71befe', 'Lolo', 'Martin', 'M', '2003-12-09', 'Hanoi', '6281827567890', now(), now())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('patients');
    }
}
