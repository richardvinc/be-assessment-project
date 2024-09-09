import 'reflect-metadata';

import { asClass, asValue } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import { dbConfig } from './config';
import { container } from './container';
import { UserService } from './lib/users/services/user.service';

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

// container
container.register({
    db: asValue(dbConfig),
    userService: asClass(UserService),
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
