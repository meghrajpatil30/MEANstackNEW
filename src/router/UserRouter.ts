import { Router, Request, Response, NextFunction } from 'express';
import User from '../model/User';
import ServerData from '../serverdata/ServerData';

class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
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
    public GetUsers (req: Request, res: Response): void {
        ServerData.getAllUsers(req.query.search).then((data) => {
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

    public SaveUser (req: Request, res: Response): void {
    ServerData.saveUser(req.body).then((data) => {
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

    public UpdateUser (req: Request, res: Response): void {
    ServerData.updateUser(req.params.id, req.body).then((data) => {
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

    public GetUserById (req: Request, res: Response): void {
    ServerData.getUserById(req.params.id).then((data) => {
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
   



    public DeleteUser (req: Request, res: Response): void {
    ServerData.deleteUser(req.params.id).then((data) => {
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

export default userRoutes.router;
