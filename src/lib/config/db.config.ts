import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const dbConfig: DataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/entities/*.entity.{js,ts}'],
    synchronize: false,
    logging: true,
    migrations: [__dirname + '/../../migrations/*.{js,ts}'],
});

export const getDb = async () => {
    return dbConfig.isInitialized ? dbConfig : await dbConfig.initialize();
};
