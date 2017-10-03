/// <reference path="../typings/index.d.ts" />
/*/// <reference path="controllers/UserControllers.ts" />*/
// import UserController from "app/controllers/UserControllers";

 module MyApp {
    class MainController {
        private name: string;
        private searchText: string;
        private users: Array<Object>;
        // static $inject = ['$scope', '$http'];
        constructor(private $scope: ng.IScope, private $http: ng.$http,  private $window: ng.$window) {
            $scope.vm = this;
            //toastr['error']('Internal Error');
           // toastr['success']('Internal Error');
           // toastr['info']('Internal Error');
        }
      /*  getUsers1() {
            
            this.$http.get('api/v1/users?search='+this.searchText).then((data) => {
                if (data.status == 200) {
                    this.users = data.data;
                } else {
                    alert('Error');
                }
                
            }).catch((err) => {
                console.log('Error');
            });
        } */
        getUsers() {
            this.$http.get('api/v1/users?search='+this.searchText).then((data) => {
                if (data.status == 200) {
                    this.users = data.data;
                } else {
                    alert('Error');
                }
                
            }).catch((err) => {
                console.log('Error');
            });
        }

        deleteUser(id: string) {
            bootbox.confirm('Are you sure you want to delete this user', (r) => {
                if (r) {
                    this.$http.delete('api/v1/users/'+ id).then((data) => {
                        if (data.data.status == 200) {
                            this.getUsers();
                        } else {
                            toastr['error'](data.data.message);
                        }
                    }).catch((err) => {
                        console.log('Error', err);
                        toastr['error']('Internal Error');
                    });
                }
            });
        }
        search(id: string) {
            this.$http.get('api/v1/users').then((data) => {
                if (data.status == 200) {
                    this.users = data.data;
                } else {
                    alert('Error');
                }
                
            }).catch((err) => {
                console.log('Error');
            });
        }

    }

    class UserController {
        private userObj: Object;
        constructor(private $scope: ng.IScope, private $http: ng.$http, private $state: ng.$state, private $stateParams: ng.$stateParams){
            $scope.vm = this;
        }

        addUser(form: any) {
            if (form.$valid) {
                if (this.$stateParams.id) {
                    this.$http.put('api/v1/users/'+ this.$stateParams.id, this.userObj).then((data) => {
                        if (data.data.status == 200) {
                            this.$state.go('userList');
                            toastr['success'](data.data.message);
                        } else {
                            toastr['error'](data.data.message);
                        }
                    }).catch((err) => {
                        console.log('Error');
                        toastr['error']('Internal Error');
                    });
                } else {
                    this.$http.post('api/v1/users', this.userObj).then((data) => {
                        if (data.data.status == 200) {
                            this.$state.go('userList');
                            toastr['success'](data.data.message);
                        } else {
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
                this.$http.get('api/v1/users/byId/'+ this.$stateParams.id).then((data) => {
                    if (data.data.status == 200) {
                        this.userObj = data.data.data;
                    } else {
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

    function config($locationProvider: ng.ILocationProvider,
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider) {
        
        //html5 removes the need for # in URL
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });

        $urlRouterProvider.otherwise('/');
        //angular-ui-router for multiple views
        $stateProvider
            .state('userList', <ng.ui.IState>{
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
            .state('addUser', <ng.ui.IState>{
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
            .state('editUser', <ng.ui.IState>{
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
            })
            
          
            //more states here.
    }

}
