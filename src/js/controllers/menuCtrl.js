/**
 * Created by vitamin on 2017/8/26.
 */
define(['app','jquery'], function(app,$){

    return app.controller('menuCtrl',['$rootScope','httpService',function($rootScope,httpService){

         var url = "http://api.omc.l/index/index/index";

         httpService.get(url).then(function(result){
             console.log(result);
             if(result.status==200){
                 $rootScope.menu = result.data;
                 console.log();
             }else{
                 alert('Request Error!');
             }
         });


         $rootScope.initMenu = function(data){

         };

         $rootScope.leftMenu = function(data){
             var navNode ='';
         };


         $rootScope.headerLogo = function(data){
             var navNode = "";
         }
    }]);
});