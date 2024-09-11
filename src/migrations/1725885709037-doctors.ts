import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Doctor1725885709037 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'doctors',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'license_number',
                        type: 'varchar',
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

        await queryRunner.query(`INSERT INTO public.doctors
            (id, license_number, first_name, last_name, gender, date_of_birth, created_at, updated_at)
            VALUES('c721e2f5-4eac-4996-9cca-d135efe49e1d', 'N001432J99LMNOP  ', 'popo', 'fernandes', 'M', '1980-12-12', now(), now())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('doctors');
    }
}
