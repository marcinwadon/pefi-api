import { ExpressConfig } from './Express';
import * as config from 'config';

export class Application {

    public server: any;
    public express: ExpressConfig;

    constructor() {
        this.express = new ExpressConfig();

        const port = config.get('ports.http');
        const debugPort = config.get('ports.debug');

        this.server = this.express.app.listen(port, () => {
            console.log('Server started!');
        });
    }

}
