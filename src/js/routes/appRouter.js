/**
 * 路由
 */
define(['app'], function(app){
    return app.config(['$routeProvider',function($routeProvider) {
        $routeProvider
            .when('/user', {
                templateUrl: 'js/views/user/user.html',
                controller: 'userCtrl'
            })
            .when('/role', {
                templateUrl: 'js/views/user/role.html',
                controller:'roleCtrl'
            })
            .when('/auth', {
                templateUrl: 'js/views/user/authority.html',
                controller:'authorityCtrl'
            })
            .when('/menu', {
                template:'<h>Menu</h>',
                controller:'menuCtrl'
            })
            .otherwise('/menu');

        //$locationProvider.html5Mode(true).hashPrefix('!');

    }])


});