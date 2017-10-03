"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ServerData_1 = require("../serverdata/ServerData");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /*  public GetUsers1 (req: Request, res: Response): void {
      ServerData.getAllUsers1(req.query.search).then((data) => {
              res.json({
                  status: 200,
                  data: data
              });
          }).catch((err) => {
              res.json({
                  status: 500,
                  data: err
              });
          });
      } */
    GetUsers(req, res) {
        ServerData_1.default.getAllUsers(req.query.search).then((data) => {
            res.json({
                status: 200,
                data: data
            });
        }).catch((err) => {
            res.json({
                status: 500,
                data: err
            });
        });
    }
    SaveUser(req, res) {
        ServerData_1.default.saveUser(req.body).then((data) => {
            res.json({
                status: 200,
                message: 'User saved successfully  !!!!!',
                data: data
            });
        }).catch((err) => {
            res.json({
                status: 500,
                message: err
            });
        });
    }
    UpdateUser(req, res) {
        ServerData_1.default.updateUser(req.params.id, req.body).then((data) => {
            res.json({
                status: 200,
                message: 'User updated successfully',
                data: data
            });
        }).catch((err) => {
            res.json({
                status: 500,
                message: err
            });
        });
    }
    GetUserById(req, res) {
        ServerData_1.default.getUserById(req.params.id).then((data) => {
            res.json({
                status: 200,
                data: data
            });
        }).catch((err) => {
            res.json({
                status: 500,
                message: err
            });
        });
    }
    //edited
    DeleteUser(req, res) {
        ServerData_1.default.deleteUser(req.params.id).then((data) => {
            res.json({
                status: 200,
                message: 'User deleted successfully',
                data: data
            });
        }).catch((err) => {
            res.json({
                status: 500,
                message: err
            });
        });
    }
    routes() {
        this.router.get('/', this.GetUsers);
        //this.router.get('/', this.GetUsers1);
        this.router.post('/', this.SaveUser);
        this.router.put('/:id', this.UpdateUser);
        this.router.delete('/:id', this.DeleteUser);
        this.router.get('/byId/:id', this.GetUserById);
    }
}
//export
const userRoutes = new UserRouter();
userRoutes.routes();
exports.default = userRoutes.router;
