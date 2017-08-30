/**
 * Created by vitamin on 2017/8/26.
 */
define(['app','jquery'], function(app,$){

    return app.controller('menuCtrl',['$rootScope','httpService',function($rootScope,httpService){

         var url = "http://api.omc.l/index/index/index";

/*         httpService.post(url,"{}").then(function(result){
              console.log(result);
         });

         return;*/
         /**
          * 获取菜单数据
          * */
         httpService.get(url).then(function(result){
             if(result.status==200){
                 $rootScope.menu = result.data.data;
                 $rootScope.clearMenu();
                 $rootScope.initMenu($rootScope.menu);
             }else{
                 alert('Request Error!');
             }
         });

        /**
         * 初化菜单
         * 默认显示第一个数据
         */
         $rootScope.initMenu = function(data){
             var index = 0;
             $rootScope.navigationMenu(data);
             $('.sidebar-menu').each(function(){
                  if(index==0){
                      $(this).show();
                  }else{
                      $(this).hide();
                  }
                 index++;
             });
             $('.headerNavi li').on('click',function(){
                  $('.headerNavi li').removeClass('headerShadow');
                  $(this).addClass('headerShadow');
                  $('.sidebar-menu').hide();
                  $('#'+$(this).attr('title')).show();
             });
         };

         /**
          * 初始化左边菜单数据
          * */
         $rootScope.leftMenu = function(id,title,data){
             var sidebarMenu = $("<ul class='sidebar-menu' id="+id+"></ul>");
             $(sidebarMenu).appendTo(".sidebar");
             var naviHeader =  "<li class='header'>"+title+"</li>";
             $(naviHeader).appendTo(sidebarMenu);
             for(var i=0;i<data.length;i++){
                 var treeview = $("<li class='treeview'></li>");
                 var treeNode = $("<a><i class='fa fa-user'></i><span>"+data[i].title+"</span><i class='fa fa-angle-left pull-right fa-2x'></i></a>");
                 $(treeNode).appendTo(treeview);
                 if(data[i].child!=undefined&&data[i].child.length>0){
                     $rootScope.nodeHandle(treeview,data[i].child);
                 }
                 $(treeview).appendTo(sidebarMenu);
             }
         };


         /**
          * 递归处理子节点
          * */
         $rootScope.nodeHandle = function(parentNode,data){
               var treeview_menu = $("<ul class='treeview-menu'></ul>");
               for(var i=0;i<data.length;i++){
                   var childNode = $("<li class='child_node' name='"+data[i].name+"' url='"+data[i].url+"'><a><i class='fa fa-circle-o'></i>"+data[i].title+"</a></li>");
                   $(treeview_menu).append(childNode);
                   if(data[i].child!=undefined&&data[i].child.length>0)
                       $rootScope.nodeHandle(childNode,data[i].child);

               }
               $(treeview_menu).appendTo(parentNode);
         };



         /**
          * 初始化菜单导航
          * */
         $rootScope.navigationMenu = function(data){
             for(var i=0;i<data.length;i++){
                 var navNode = $("<li class='xiTong yin' title="+data[i].title+data[i].id+">"+data[i].title+"</li>");
                 var id = data[i].title+data[i].id;
                 $('.headerNavi').append(navNode);
                 $rootScope.leftMenu(id,data[i].title,data[i].child);
             }

         };


         /**
          * 清理菜单数据
          * */
         $rootScope.clearMenu = function(){
             $('.headerNavi li').remove();
             $('.sidebar-menu').remove();
         }


    }]);
});