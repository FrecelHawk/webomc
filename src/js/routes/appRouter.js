/**
 * 路由器
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
                template:'',
                controller:'menuCtrl'
            })
            .otherwise('/menu');

    }])


});