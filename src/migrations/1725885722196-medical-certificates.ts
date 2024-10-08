import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class MedicalCertificates1725885722196 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'medical_certificates',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'patient_id',
                        type: 'uuid',
                    },
                    {
                        name: 'doctor_id',
                        type: 'uuid',
                    },
                    {
                        name: 'diagnosis',
                        type: 'varchar',
                    },
                    {
                        name: 'category',
                        type: 'varchar',
                    },
                    { name: 'insurance_name', type: 'varchar' },
                    { name: 'cost_unit', type: 'varchar' },
                    { name: 'status', type: 'varchar' },
                    { name: 'establishment_no', type: 'varchar' },
                    { name: 'datum', type: 'varchar' },
                    { name: 'nearest_hospital', type: 'varchar' },
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

        await queryRunner.createForeignKey(
            'medical_certificates',
            new TableForeignKey({
                columnNames: ['doctor_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'doctors',
                onDelete: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'medical_certificates',
            new TableForeignKey({
                columnNames: ['patient_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'patients',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('medical_certificates');
    }
}
