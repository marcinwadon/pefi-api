import { ExpressConfig } from './Express';
import * as config from 'config';

export class Application {

    public server: any;
    public express: ExpressConfig;

    constructor() {
        this.express = new ExpressConfig();

        const port: number = config.get<number>('ports.http');
        const debugPort: number = config.get<number>('ports.debug');

        this.server = this.express.app.listen(port, () => {
            console.log('Server started!');
        });
    }

}
