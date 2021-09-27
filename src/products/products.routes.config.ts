import express from 'express';

import { CommonRoutesConfig } from '../common/common.routes.config';

export class ProductsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ProductsRoutes');
    }

    configureRoutes() {
        this.app.route(`/products`)
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`Server running at http://localhost:3000`)
            });
            
        return this.app;
    }
}