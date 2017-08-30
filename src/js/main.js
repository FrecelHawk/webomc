/**
 * Created by vitamin on 2017/8/24.
 * JS配置加载入口
 */
require.config({
    baseUrl: "",
    paths: {
        "jquery": "plugs/jquery/jquery-1.11.3",
        "jquery-ui":"plugs/jquery/jquery-ui",
        "dateformat":"plugs/dateformat/dateFormat",
        "bootstrap":"plugs/bootstrap/js/bootstrap",
        "bootstrap-table":"plugs/bootstrap-table/js/bootstrap-table",
        "flatui":"plugs/flatui/flat-ui",
        "flat-appliction":"plugs/flatui/application",
        "prettify":"plugs/flatui/prettify",
        "ztree":"plugs/ztree/jquery.ztree.all",

        "angular":"plugs/angular/angular.min",
        "angular-route":"plugs/angular/angular-route.min",
        "angular-sanitize":"plugs/angular/angular-sanitize.min",

        "jquery-dialog":"js/directives/jquery-dialog",
        "bootstrap-table-dir":"js/directives/bootstrap-table",

        "app":"js/app",
        "httpService":"js/services/HttpService",
        "menuCtrl":"js/controllers/menuCtrl",
        "userCtrl":"js/controllers/userCtrl",
        "roleCtrl":"js/controllers/roleCtrl",
        "authCtrl":"js/controllers/authorityCtrl",
        "router":"js/routes/appRouter",

        "common":"js/common/common",
        "sidebar-menu":"js/common/sidebar-menu"
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route':{
            deps: ["angular"],
            exports: 'angular-route'
        },
        'angular-sanitize':{
            deps: ["angular"],
            exports: 'angular-sanitize'
        },
        'common':{
            deps:['jquery'],
            exports:'common'
        },
        'sidebar-menu':{
             deps:['jquery'],
             exports:'sidebar-menu'
        },
        'bootstrap':{
            deps:['jquery'],
            exports:'bootstrap'
        },
        'bootstrap-table':{
            deps:['jquery','bootstrap'],
            exports:'bootstrap-table'
        },
        'flat-appliction':{
            deps:['jquery','flatui'],
            exports:'flat-appliction'
        },
        'ztree':{
            deps:['jquery'],
            exports:'ztree'
        },
        'flatui':{
            deps:['jquery'],
            exports:'flatui'
        }
    }
});


require(['jquery', 'angular', 'jquery-ui', 'dateformat','bootstrap', 'bootstrap-table', 'flatui', 'flat-appliction', 'ztree', 'angular-route', 'angular-sanitize', 'app', 'httpService', 'common', 'sidebar-menu', 'jquery-dialog', 'bootstrap-table-dir',  'userCtrl', 'roleCtrl', 'authCtrl','menuCtrl', 'router'], function ($, angular) {


    $(function () {
        angular.bootstrap(document, ["webapp"]);
        console.log(angular);
        $.sidebarMenu($('.sidebar'));


    })

});