/// <reference path="../typings/index.d.ts" />
/*/// <reference path="controllers/UserControllers.ts" />*/
// import UserController from "app/controllers/UserControllers";
var MyApp;
(function (MyApp) {
    var MainController = /** @class */ (function () {
        // static $inject = ['$scope', '$http'];
        function MainController($scope, $http, $window) {
            this.$scope = $scope;
            this.$http = $http;
            this.$window = $window;
            $scope.vm = this;
            toastr['error']('Internal Error');
            toastr['success']('Internal Error');
            toastr['info']('Internal Error');
        }
        MainController.prototype.getUsers = function () {
            var _this = this;
            this.$http.get('api/v1/users').then(function (data) {
                if (data.status == 200) {
                    _this.users = data.data;
                }
                else {
                    alert('Error');
                }
            })["catch"](function (err) {
                console.log('Error');
            });
        };
        MainController.prototype.deleteUser = function (id) {
            var _this = this;
            bootbox.confirm('Are you sure you want to delete this user', function (r) {
                if (r) {
                    _this.$http["delete"]('api/v1/users/' + id).then(function (data) {
                        if (data.data.status == 200) {
                            _this.getUsers();
                        }
                        else {
                            toastr['error'](data.data.message);
                        }
                    })["catch"](function (err) {
                        console.log('Error', err);
                        toastr['error']('Internal Error');
                    });
                }
            });
        };
        return MainController;
    }());
    var UserController = /** @class */ (function () {
        function UserController($scope, $http, $state, $stateParams) {
            this.$scope = $scope;
            this.$http = $http;
            this.$state = $state;
            this.$stateParams = $stateParams;
            $scope.vm = this;
        }
        UserController.prototype.addUser = function (form) {
            var _this = this;
            if (form.$valid) {
                if (this.$stateParams.id) {
                    this.$http.put('api/v1/users/' + this.$stateParams.id, this.userObj).then(function (data) {
                        if (data.data.status == 200) {
                            _this.$state.go('userList');
                            toastr['success'](data.data.message);
                        }
                        else {
                            toastr['error'](data.data.message);
                        }
                    })["catch"](function (err) {
                        console.log('Error');
                        toastr['error']('Internal Error');
                    });
                }
                else {
                    this.$http.post('api/v1/users', this.userObj).then(function (data) {
                        if (data.data.status == 200) {
                            _this.$state.go('userList');
                            toastr['success'](data.data.message);
                        }
                        else {
                            toastr['error'](data.data.message);
                        }
                    })["catch"](function (err) {
                        console.log('Error');
                        toastr['error']('Internal Error');
                    });
                }
            }
        };
        UserController.prototype.getUserById = function () {
            var _this = this;
            if (this.$stateParams.id) {
                this.$http.get('api/v1/users/byId/' + this.$stateParams.id).then(function (data) {
                    if (data.data.status == 200) {
                        _this.userObj = data.data.data;
                    }
                    else {
                        toastr['error'](data.data.message);
                    }
                })["catch"](function (err) {
                    console.log('Error', err);
                    toastr['error']('Internal Error');
                });
            }
        };
        return UserController;
    }());
    var myApp = angular.module('MyApp', ['ngRoute', 'ui.router']).config(config);
    myApp.controller('MainController', MainController)
        .controller('UserController', UserController);
    config.$inject = [
        '$locationProvider',
        '$stateProvider',
        '$urlRouterProvider'
    ];
    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        //html5 removes the need for # in URL
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });
        $urlRouterProvider.otherwise('/');
        //angular-ui-router for multiple views
        $stateProvider
            .state('userList', {
            url: "/",
            views: {
                "header": {
                    templateUrl: "/app/home/views/header.html"
                },
                "content": {
                    templateUrl: "/app/users/views/list.html"
                }
            }
        })
            .state('addUser', {
            url: "/add-user",
            views: {
                "header": {
                    templateUrl: "/app/home/views/header.html"
                },
                "content": {
                    templateUrl: "/app/users/views/add-user.html",
                    controller: 'UserController'
                }
            }
        })
            .state('editUser', {
            url: "/edit-user/:id",
            views: {
                "header": {
                    templateUrl: "/app/home/views/header.html"
                },
                "content": {
                    templateUrl: "/app/users/views/add-user.html",
                    controller: 'UserController'
                }
            }
        });
        //more states here.
    }
})(MyApp || (MyApp = {}));
