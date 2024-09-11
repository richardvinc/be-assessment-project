# Backend Project

# Overview

This project is the backend required to run [this assesment test](https://github.com/noscai/fullstak-senior-engineer-scheine/tree/main).
It is supposed to be a minimal configuration to generate general medical certificate (Mustersammlung) in PDF, based on data enterd by user.
All the data in the database is seeded after we run the migration, for it is related for some hardcoded value in the frontend.

# Code Structure

We group each domain to its own folder in `lib`. We hav three domains, `doctors`, `medical-certificates`, and `patients`.
We use `camelCase` cnvention for the backend, but we use `snake_case` for the frontend part.

Each folder will have several elements, such as:

-   `domains` folder to host the main domain object
-   `entities` folder, where TypeORM entity live. We also use this entity to return the data to the public, but we rename the properties using `@Expose` syntax from `class-transformer`.
-   `services` folder will host main function for the domain (interacting with repository, generating PDF, etc.)
-   `controller` file to serve the route. We use `awilix-express` with decorator approach because it feels easier to understand.

We utilize `awilix` as our dependency injection solution, so we can easily inject the dependency for each of the controller and service's constructor.

### Example

```javascript
constructor(private readonly doctorService: DoctorService) {
        super();
    }
```

This way, we only need to inject the services and controllers on `index.ts` and it will be available throughout.

```javascript
container.register({
    db: asValue(dbConfig),
    doctorService: asClass(DoctorService),
    patientService: asClass(PatientService),
    medicalCertificateService: asClass(MedicalCertificateService),
});

app.use(loadControllers('lib/**/*.controller.ts', { cwd: __dirname }));
```

We serve generated PDF file as static files from `src/public/pdfs` folder. It will be accessible from `localhost:3000/docs/xxx.pdf` from the client.

# Operation Environment

-   NodeJS v20.17.0 LTS
-   Windows 11

# Development Setup

## Build

To build the program, you need to:

-   Clone the repository
-   run `cd` command to the directory
-   run `npm i` to install all the dependency
-   run `npm run build` and it will build into `dist` folder

## Run Locally

To build the program, you need to:

-   Clone the repository
-   run `cd` command to the directory
-   run `npm i` to install all the dependency
-   run `npm run dev` and it will run the server on port `3000`

# Database Migration

All migration files are on the `src/migrations` folder. We will use TypeORM to help us migrate it.
First, you need to create `.env` file in the root directory and populate it with credential to the database. It should be something like this:

```
PORT = 3000
DB_HOST = xxx
DB_NAME = xxx
DB_USERNAME = xxx
DB_PASSWORD = xxx
DB_PORT = 5432
```

It seems like there is no easy way to migrate using Typescript that will work on every NodeJs version, so the easiest way is to build the application, and run `npm run migration:run`. It will access `dbConfig.js` file in the `dist` folder.
