import dotenv from 'dotenv';
dotenv.config();

import './types/extensions';
import express, {Express} from 'express';
import helmet from 'helmet';
import { authenticateUser, checkAuthentication, limiter } from './middleware';
import { router as globalRouter } from './routes';

import  './database';
import path from 'path';
import { ROUTES } from './constants/Routes';

const app: Express = express();
const port = process.env.PORT ?? 3000;

export const MAIN_PATH = path.join(__dirname);

app.use(helmet({ contentSecurityPolicy: false, }));
app.use(express.json({ limit: '4mb', }));
app.use(express.urlencoded({ limit: '4mb', extended: true, parameterLimit: 500000 }));
app.use(express.text());
app.use('/public',express.static('public'))

app.use(limiter);

app.use(authenticateUser);
app.use(checkAuthentication);

app.use(ROUTES.PATH_INDEX, globalRouter);

/*
 *  Serve the frontend
*/
app.get('/', (req, res) => {
    res.sendFile(path.join(MAIN_PATH, '../', 'public/frontend/index.html'));
})

app.listen(port, async() => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;