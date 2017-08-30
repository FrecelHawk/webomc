/**
 * Created by vitamin on 2017/8/25.
 */
define(['app','jquery'], function(app,$){

    return app.controller('authorityCtrl',['$scope','httpService','$controller',function($scope,httpService,$controller){

            $controller('menuCtrl');

         $("select").select2({dropdownCssClass: 'dropdown-inverse'});
        $(':radio').radiocheck();

         var url = "http://api.omc.l/index/auth/index";

        $scope.auth = {auth_type:0,auth_status:1};

        $scope.title = "系统管理/权限管理";

        var setting = {
            view: {
                selectedMulti: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: zTreeOnClick
            }

        };

        var settingParent = {
            view: {
                selectedMulti: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: zTreePOnClick
            }
        };


        httpService.get(url).then(function(result){
             if(result.status==200){
                 $scope.initTree(result.data.data);
             }
         });

         $scope.initTree = function(data){
              if(data!=undefined&&data.length>0)
                   $scope.handlerTree(data);
         };


         $scope.handlerTree = function(data){
               var nodes = [];
               for(var i=0;i<data.length;i++){
                   var treeNode = {id:data[i].id,pId:data[i].pid,name:data[i].title,path:data[i].path,api:data[i].name,status:data[i].status,sort:data[i].status,ptitle:data[i].ptitle, open:true};
                   nodes.push(treeNode);
               }
             $(document).ready(function(){
                 $.fn.zTree.init($("#auth_tree"), setting,nodes);
                 $.fn.zTree.init($("#auth_parent_tree"),settingParent,nodes);

             });

         };




        function zTreeOnClick(event, treeId, treeNode) {

            if(treeNode.api=="") return;

            $scope.$apply(function(){

                    $scope.auth.id = treeNode.id;
                    $scope.auth.api = treeNode.api;
                    $scope.auth.status = treeNode.status;
                    $scope.auth.pid = treeNode.pId;
                    $scope.auth.sort = treeNode.sort;
                    $scope.auth.path = treeNode.path;
                    $scope.auth.name = treeNode.name;
                    $scope.auth.ptitle = treeNode.ptitle;
            });

        };


        function zTreePOnClick(event,treeId,treeNode){
            alert(treeId);
        }


        $scope.save = function(){

        };

        $scope.update = function(){

        };

        $scope.delete = function(){

        }




    }]);
});