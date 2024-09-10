import { instanceToPlain } from 'class-transformer';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import { DataSource, Repository } from 'typeorm';

import { DoctorService } from '@project/lib/doctors/services/doctor.service';
import { PatientService } from '@project/lib/patients/services/patient.service';

import { MedicalCertificateDomain } from '../domains/medical-certificate.domain';
import { MedicalCertificateEntity } from '../entities/medical-certificate.entity';

export class MedicalCertificateService {
    repository: Repository<MedicalCertificateEntity>;

    constructor(
        private readonly db: DataSource,
        private readonly doctorService: DoctorService,
        private readonly patientService: PatientService
    ) {
        this.repository = this.db.getRepository(MedicalCertificateEntity);
    }

    async getAll() {
        return instanceToPlain(this.repository.find());
    }

    async getById(id: string) {
        const mr = this.repository.findOneBy({
            id,
        });

        return mr ? instanceToPlain(mr) : null;
    }

    async create(domain: MedicalCertificateDomain) {
        await this.createPdf(domain);
        return instanceToPlain(await this.repository.save(domain.toEntity()));
    }

    private async createPdf(domain: MedicalCertificateDomain) {
        const doctor = await this.doctorService.getById(domain.props.doctorId);
        const patient = await this.patientService.getById(
            domain.props.patientId
        );

        if (!doctor || !patient) {
            throw new Error('Doctor or patient not found');
        }

        const doc = new PDFDocument({
            size: 'A4',
            margin: 20,
            layout: 'landscape',
        });
        doc.pipe(
            fs.createWriteStream(
                `${__dirname}/../../../public/pdfs/${domain.id}.pdf`
            )
        );

        doc.rect(0, 0, 841.89, 595.28).fill('#fad2c2');

        doc.rect(50, 30, 450, 260).fillAndStroke('#ffffff', '#ff9494');
        doc.rect(530, 210, 290, 80).fillAndStroke('#ffffff', '#ff9494');
        doc.rect(50, 310, 450, 250).fillAndStroke('#ffffff', '#ff9494');
        doc.rect(530, 310, 290, 250).fillAndStroke('#ffffff', '#ff9494');

        // title
        doc.fillColor('#ff9494')
            .text(`Verordnung von`, 530, 30, { height: 20 })
            .text(`Krankenhausbehandlung`, 530, 55, { height: 20 })
            .fillColor('#ff9494')
            .text(`(Nur bei medizinischer Notwendigkeit zulässig)`, 530, 80, {
                height: 20,
            });

        // bullet points
        doc.rect(530, 120, 30, 30).fillAndStroke('#ffffff', '#ff9494');
        doc.rect(675, 120, 30, 30).fillAndStroke('#ffffff', '#ff9494');
        doc.rect(530, 166, 30, 30).fillAndStroke('#ffffff', '#ff9494');
        doc.rect(675, 166, 30, 30).fillAndStroke('#ffffff', '#ff9494');
        doc.fillColor('#000').text(
            domain.props.category === 'TREATMENT' ? 'v' : '',
            540,
            130
        ); // option top-left
        doc.fillColor('#000').text(
            domain.props.category === 'EMERGENCY' ? 'v' : '',
            685,
            130
        ); // option top-right
        doc.fillColor('#000').text(
            domain.props.category === 'ACCIDENT' ? 'v' : '',
            540,
            176
        ); // option bottom-left
        doc.fillColor('#000').text(
            domain.props.category === 'BVG' ? 'v' : '',
            685,
            176
        ); // option bottom-right
        doc.fillColor('#ff9494')
            .text('Belegarzt-\nbehandlung', 565, 120)
            .text('Notfall', 710, 120)
            .text('Unfall,\nUnfallfolgen', 565, 166)
            .text('Versorgungs-\nleiden (BVG)', 710, 166);

        doc.fillColor('#ff9494')
            .text('Krankenkasse bzw. Kostenträger', 60, 34)
            .text('Name, Vorname des Versicherten', 60, 90)
            .text('(geb. am)', 410, 120)
            .text('Kostenträgerkennung', 60, 190)
            .text('Versicherten-Nr.', 210, 190)
            .text('Status', 400, 190)
            .text('Betriebsstätten-Nr', 60, 240)
            .text('Arzt-Nr.', 215, 240)
            .text('Datum', 380, 240);

        doc.fillColor('#000')
            // '(health insurance/cost carrier)'
            .text(`${domain.props.insuranceName}`, 60, 50)
            //(surname)
            .text(`${patient.lastName}, ${patient.firstName}`, 60, 115)
            // born on
            .text(`${patient.placeOfBirth}`, 410, 135)
            // cost unit identification
            .text(`${domain.props.costUnit}`, 60, 205)
            // phone number
            .text(`${patient.phoneNumber}`, 210, 205)
            // status
            .text(`${domain.props.status}`, 400, 205)
            // establishment no.
            .text(`${domain.props.establishmentNo}`, 60, 255)
            // doct no.
            .text(`${doctor.licenseNumber}`, 215, 255)
            // datum.
            .text(`${domain.props.datum}`, 380, 255);

        doc.fillColor('#ff9494').text('Diagnose', 60, 320);
        doc.fillColor('#000').text('lorem ipsum dolor sit amet', 60, 335, {
            width: 430,
            height: 210,
        });

        doc.fillColor('#ff9494').text(
            'Nächsterreichbare, geeignete Krankenhäuser',
            540,
            220
        );
        doc.fillColor('#000').text('(Nearest suitable hospitals)', 540, 235);

        doc.fillColor('#ff9494').text(
            'Vertragsarztstempel / Unterschrift des Arztes',
            540,
            540
        );

        doc.end();
    }

    async createDummyPdf() {
        const doc = new PDFDocument({
            size: 'A4',
            margin: 20,
            layout: 'landscape',
        });
        doc.pipe(
            fs.createWriteStream(`${__dirname}/../../../public/pdfs/dummy.pdf`)
        );

        doc.rect(0, 0, 841.89, 595.28).fill('#fad2c2');

        doc.rect(50, 30, 450, 260).fillAndStroke('#ffffff', '#ff9494');
        doc.rect(530, 210, 290, 80).fillAndStroke('#ffffff', '#ff9494');
        doc.rect(50, 310, 450, 250).fillAndStroke('#ffffff', '#ff9494');
        doc.rect(530, 310, 290, 250).fillAndStroke('#ffffff', '#ff9494');

        // title
        doc.fillColor('#ff9494')
            .text(`Verordnung von`, 530, 30, { height: 20 })
            .text(`Krankenhausbehandlung`, 530, 55, { height: 20 })
            .fillColor('#ff9494')
            .text(`(Nur bei medizinischer Notwendigkeit zulässig)`, 530, 80, {
                height: 20,
            });

        // bullet points
        doc.rect(530, 120, 30, 30).fillAndStroke('#ffffff', '#ff9494');
        doc.rect(675, 120, 30, 30).fillAndStroke('#ffffff', '#ff9494');
        doc.rect(530, 166, 30, 30).fillAndStroke('#ffffff', '#ff9494');
        doc.rect(675, 166, 30, 30).fillAndStroke('#ffffff', '#ff9494');
        doc.fillColor('#000').text('v', 540, 130); // option top-left
        doc.fillColor('#000').text('v', 685, 130); // option top-right
        doc.fillColor('#000').text('v', 540, 176); // option bottom-left
        doc.fillColor('#000').text('v', 685, 176); // option bottom-right
        doc.fillColor('#ff9494')
            .text('Belegarzt-\nbehandlung', 565, 120)
            .text('Notfall', 710, 120)
            .text('Unfall,\nUnfallfolgen', 565, 166)
            .text('Versorgungs-\nleiden (BVG)', 710, 166);

        doc.fillColor('#ff9494')
            .text('Krankenkasse bzw. Kostenträger', 60, 34)
            .text('Name, Vorname des Versicherten', 60, 90)
            .text('(geb. am)', 410, 120)
            .text('Kostenträgerkennung', 60, 190)
            .text('Versicherten-Nr.', 210, 190)
            .text('Status', 400, 190)
            .text('Betriebsstätten-Nr', 60, 240)
            .text('Arzt-Nr.', 215, 240)
            .text('Datum', 380, 240);

        doc.fillColor('#000')
            .text('(health insurance/cost carrier)', 60, 50)
            .text('(surname)', 60, 115)
            .text('(born on)', 410, 135)
            .text('(cost unit identification)', 60, 205)
            .text('(phone number)', 210, 205)
            .text('(status)', 400, 205)
            .text('(establishment no.)', 60, 255)
            .text('(doct no.)', 215, 255)
            .text('(datum.)', 380, 255);

        doc.fillColor('#ff9494').text('Diagnose', 60, 320);
        doc.fillColor('#000').text('lorem ipsum dolor sit amet', 60, 335, {
            width: 430,
            height: 210,
        });

        doc.fillColor('#ff9494').text(
            'Nächsterreichbare, geeignete Krankenhäuser',
            540,
            220
        );
        doc.fillColor('#000').text('(Nearest suitable hospitals)', 540, 235);

        doc.fillColor('#ff9494').text(
            'Vertragsarztstempel / Unterschrift des Arztes',
            540,
            540
        );

        doc.end();
    }
}
