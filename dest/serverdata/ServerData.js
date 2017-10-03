"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
class ServerData {
    /*  public static getAllUsers1(search: string) {
          return new Promise((resolve, reject) => {
              let condition = {deleted: true};
              if(search){
                  condition.email = new RegExp(search, 'ig');
              }
              
              User.find(condition).then((data) => {
                  resolve(data);
              }).catch((err) => {
                  reject('Internal Error');
              });
          });
      } */
    static getAllUsers(search) {
        return new Promise((resolve, reject) => {
            let condition = { deleted: false };
            if (search && search != 'undefined') {
                condition.email = new RegExp(search, 'ig');
            }
            console.log(condition, '------', search);
            User_1.default.find(condition).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject('Internal Error');
            });
        });
    }
    static saveUser(body) {
        return new Promise((resolve, reject) => {
            User_1.default.findOne({ email: new RegExp(body.email, 'i'), deleted: false })
                .then((data) => {
                return data;
            })
                .then((exist) => {
                if (exist) {
                    reject('Email already exist, Please try again');
                }
                else {
                    new User_1.default({
                        name: body.name,
                        email: body.email,
                        phone: body.phone,
                        address: body.address
                    }).save((err, data) => {
                        if (!err)
                            resolve(data);
                        else
                            reject('Internal Error');
                    });
                }
            }).catch((err) => {
                reject('Internal Error');
            });
        });
    }
    static updateUser(id, body) {
        return new Promise((resolve, reject) => {
            User_1.default.findOne({ _id: { $ne: id }, email: new RegExp(body.email, 'i'), deleted: false })
                .then((data) => {
                return data;
            })
                .then((exist) => {
                if (exist) {
                    reject('Email already exist, Please try again');
                }
                else {
                    return User_1.default.findOne({ _id: id, deleted: false });
                }
            })
                .then((userData) => {
                if (!userData) {
                    reject('User not found');
                    return;
                }
                userData.name = body.name;
                userData.email = body.email;
                userData.phone = body.phone;
                userData.address = body.address;
                userData.save((err, data) => {
                    if (!err)
                        resolve(data);
                    else
                        reject('Internal Error');
                });
            }).catch((err) => {
                console.log(err, 'error');
                reject('Internal Error');
            });
        });
    }
    static getUserById(id) {
        return new Promise((resolve, reject) => {
            User_1.default.findOne({ _id: id }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject('Internal Error');
            });
        });
    }
    static deleteUser(id) {
        return new Promise((resolve, reject) => {
            User_1.default.findOne({ _id: id })
                .then((data) => {
                if (!data) {
                    reject('User not found');
                }
                else {
                    data.deleted = true;
                    data.save((err, savedUser) => {
                        if (!err)
                            resolve(savedUser);
                        else
                            reject('Internal Error');
                    });
                }
            }).catch((err) => {
                reject('Internal Error');
            });
        });
    }
}
exports.default = ServerData;
