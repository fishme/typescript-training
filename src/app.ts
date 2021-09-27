import * as bodyparser from 'body-parser';
import debug from 'debug';
import express from 'express';
import * as expressWinston from 'express-winston';
import * as http from 'http';
import * as winston from 'winston';

import { CommonRoutesConfig } from './common/common.routes.config';
import { ProductsRoutes } from './products/products.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port:number = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(bodyparser.json());


app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

routes.push(new ProductsRoutes(app));

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));


app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server running at http://localhost:${port}`)
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
});