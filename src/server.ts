import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as path from "path";
// import * as compression from "compression";

import UserRouter from "./router/UserRouter";

//server class
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.use('/', express.static(__dirname + '/public'));
        // viewed at http://localhost:8080
        // this.app.get('/', this.staticPath);
    }

    // public staticPath(req: any, res: any) {
    //     res.sendFile(path.join(__dirname + "/public/index.html"));
    // }

    public config() {
        const MONGO_URI = 'mongodb://localhost/tes';
        mongoose.connect(MONGO_URI);

        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        // this.app.use(logger('dev'));


    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();
        // this.app.use('/', router);
        this.app.use('/api/v1/users', UserRouter);
    }
}

export default new Server().app;