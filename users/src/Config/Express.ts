import * as fs from 'fs';
import * as path from 'path';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as yaml from 'js-yaml';
import * as cors from 'cors';
import * as config from 'config';

import { useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';

export class ExpressConfig {
    public app: express.Express;

    constructor() {
        this.app = express();

        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.setupServer();
    }

    private setupServer(): void {
        useExpressServer(this.app, {
            routePrefix: '/api',
            controllers: [
                __dirname + '/../Module/**/Controller/index.js'
            ],
            container: Container
        });
    }
}
