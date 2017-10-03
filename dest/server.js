"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// import * as compression from "compression";
const UserRouter_1 = require("./router/UserRouter");
//server class
class Server {
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
    config() {
        const MONGO_URI = 'mongodb://localhost/tes';
        mongoose.connect(MONGO_URI);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // this.app.use(logger('dev'));
    }
    routes() {
        let router;
        router = express.Router();
        // this.app.use('/', router);
        this.app.use('/api/v1/users', UserRouter_1.default);
    }
}
exports.default = new Server().app;
