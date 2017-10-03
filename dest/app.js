/// <reference path="../typings/index.d.ts" />
/*/// <reference path="controllers/UserControllers.ts" />*/
// import UserController from "app/controllers/UserControllers";
var MyApp;
(function (MyApp) {
    class MainController {
        // static $inject = ['$scope', '$http'];
        constructor($scope, $http, $window) {
            this.$scope = $scope;
            this.$http = $http;
            this.$window = $window;
            $scope.vm = this;
            toastr['error']('Internal Error');
            toastr['success']('Internal Error');
            toastr['info']('Internal Error');
        }
        getUsers() {
            this.$http.get('api/v1/users').then((data) => {
                if (data.status == 200) {
                    this.users = data.data;
                }
                else {
                    alert('Error');
                }
            }).catch((err) => {
                console.log('Error');
            });
        }
        deleteUser(id) {
            bootbox.confirm('Are you sure you want to delete this user', (r) => {
                if (r) {
                    this.$http.delete('api/v1/users/' + id).then((data) => {
                        if (data.data.status == 200) {
                            this.getUsers();
                        }
                        else {
                            toastr['error'](data.data.message);
                        }
                    }).catch((err) => {
                        console.log('Error', err);
                        toastr['error']('Internal Error');
                    });
                }
            });
        }
    }
    class UserController {
        constructor($scope, $http, $state, $stateParams) {
            this.$scope = $scope;
            this.$http = $http;
            this.$state = $state;
            this.$stateParams = $stateParams;
            $scope.vm = this;
        }
        addUser(form) {
            if (form.$valid) {
                if (this.$stateParams.id) {
                    this.$http.put('api/v1/users/' + this.$stateParams.id, this.userObj).then((data) => {
                        if (data.data.status == 200) {
                            this.$state.go('userList');
                            toastr['success'](data.data.message);
                        }
                        else {
                            toastr['error'](data.data.message);
                        }
                    }).catch((err) => {
                        console.log('Error');
                        toastr['error']('Internal Error');
                    });
                }
                else {
                    this.$http.post('api/v1/users', this.userObj).then((data) => {
                        if (data.data.status == 200) {
                            this.$state.go('userList');
                            toastr['success'](data.data.message);
                        }
                        else {
                            toastr['error'](data.data.message);
                        }
                    }).catch((err) => {
                        console.log('Error');
                        toastr['error']('Internal Error');
                    });
                }
            }
        }
        getUserById() {
            if (this.$stateParams.id) {
                this.$http.get('api/v1/users/byId/' + this.$stateParams.id).then((data) => {
                    if (data.data.status == 200) {
                        this.userObj = data.data.data;
                    }
                    else {
                        toastr['error'](data.data.message);
                    }
                }).catch((err) => {
                    console.log('Error', err);
                    toastr['error']('Internal Error');
                });
            }
        }
    }
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
                    templateUrl: "/header.html"
                },
                "content": {
                    templateUrl: "/list.html"
                }
            }
        })
            .state('addUser', {
            url: "/add-user",
            views: {
                "header": {
                    templateUrl: "/header.html"
                },
                "content": {
                    templateUrl: "/add-user.html",
                    controller: 'UserController'
                }
            }
        })
            .state('editUser', {
            url: "/edit-user/:id",
            views: {
                "header": {
                    templateUrl: "/header.html"
                },
                "content": {
                    templateUrl: "/add-user.html",
                    controller: 'UserController'
                }
            }
        });
        //more states here.
    }
})(MyApp || (MyApp = {}));
