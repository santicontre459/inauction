import { DataSeeders } from '../core/schema/common/data/DataSeeders';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import multer from 'multer';
import bodyParser from "body-parser";
import cors from 'cors';
import * as swaggerDocument from './swagger.json';
import { createConnection } from 'typeorm';
import { Container } from 'inversify';
import TYPES from './types';
import { InversifyExpressServer } from 'inversify-express-utils';
import routes from '../routes/index';
import { default as env, Environments } from '../environment';


const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        // no larger than 10mb.
        fileSize: 10 * 1024 * 1024,
    },
});

class App {

   public app: express.Application;

   constructor() {
       this.dbSetup();
       this.app = express();
       this.config();
       this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

       // Application-Level Middleware
       this.app.use(cors());
       this.initRoutes();
   }

   private initRoutes() {
       this.app.use("",routes)
   }

   private config(): void {
       this.app;
       // set limit for file
       this.app.use(multerMid.single('file'));
       // support application/json type post data
       this.app.use(bodyParser.json({limit: '50mb'}));
       //support application/x-www-form-urlencoded post data
       this.app.use(bodyParser.urlencoded({
           limit: '50mb',
           parameterLimit: 100000,
           extended: true
       }));
   }

   private async dbSetup() {

        const name = env.getEnv() === 'prod' ? 'production' : 'default';

        await createConnection('default').then( async () => {

            // await connection.runMigrations();
            // if (env.getEnv() !== Environments.prod_environment) {
            //     // here you can start to work with your entities
            //     await DataSeeders.addBusinessOperations();
            //     await DataSeeders.addCurrencies();
            //     await DataSeeders.addEventCategories();
            //     await DataSeeders.addLegalForms();
            //     await DataSeeders.addMeasurementUnits();
            //     await DataSeeders.addRoles();
            //     await DataSeeders.addSubRoles();
            //     await DataSeeders.addUser();
            //     await DataSeeders.addTaskNames();
            //     await DataSeeders.addTaskTypes();
            //     await DataSeeders.addActivityCategories();
            //     await DataSeeders.addActivities();
            // }

        }).catch(error => console.log("error conn: ", error));
   }

}
export default new App().app;
