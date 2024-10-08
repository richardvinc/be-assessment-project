import 'reflect-metadata';

import { asClass, asValue } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';

import { container } from './container';
import { dbConfig } from './lib/config';
import { DoctorService } from './lib/doctors/services/doctor.service';
import { MedicalCertificateService } from './lib/medical-certificates/services/medical-certificate.service';
import { PatientService } from './lib/patients/services/patient.service';

dotenv.config();
dbConfig
    .initialize()
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.error(err);
        throw new Error(err.message);
    });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    })
);

// serve static files
app.use('/docs', express.static(path.join(__dirname, 'public/pdfs')));

// container
container.register({
    db: asValue(dbConfig),
    doctorService: asClass(DoctorService),
    patientService: asClass(PatientService),
    medicalCertificateService: asClass(MedicalCertificateService),
});
app.use(scopePerRequest(container));

app.use(loadControllers('lib/**/*.controller.ts', { cwd: __dirname }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running  on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error(err);
    throw new Error(err.message);
});
