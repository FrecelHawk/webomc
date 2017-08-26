define(['app','jquery'], function(app,$){


    return app.controller('userCtrl', ['$scope','httpService', function ($scope,httpService) {

           $scope.title = "系统管理/用户账户";
           var url ='http://localhost:3001/users';

           $scope.open = function(){
               $("#userDialog").dialog("open");
           };

           $scope.back = function(){
               $("#userDialog").dialog("close");
           };

           $scope.change = function(){
               $("#changeDialog").dialog("open");
           };


           $scope.save = function(){
               var data = {
                   "id": 12,
                   "login_name": "test1",
                   "email": "123456@gmail.com",
                   "phone": "123456789",
                   "last_login_time": "2017/08/16",
                   "last_login_ip": "2017/08/16"
               };
/*               httpService.get(url).then(function(success){
                   console.log(JSON.stringify(success.data));
               },function(error){
                   console.log(error);
               });*/

               httpService.post(url,data).then(function(result){
                   $scope.back();
               },function(error){

               });
           };


           $scope.del = function(id){
              httpService.delete(url+'/'+id).then(function(result){
                  alert('删除成功');
              },function(error){
                  console.log(error);
              }) ;
           };



           $scope.update = function(){
               var data = {
                   "id": 9,
                   "login_name": "test14",
                   "email": "123456@gmail.com",
                   "phone": "123456789",
                   "last_login_time": "2017/08/25",
                   "last_login_ip": "2017/08/25"
               };
               httpService.put(url+"/"+data.id,data).then(function(result){
                   alert('修改成功');
               },function(error){

               });

           }


    }])

});