define(['app','jquery'], function(app,$){


    return app.controller('userCtrl', ['$scope','$rootScope','httpService','$controller', function ($scope,$rootScope,httpService,$controller) {

          $controller('menuCtrl');


          $("select").select2({dropdownCssClass: 'dropdown-inverse'});

           $scope.title = "系统管理/用户管理";

           var url = "http://api.omc.l/index/index/index/user/add";


           var localUrl = "/src/js/data/user.json";


          $scope.user ={ name:"",nick_name:"",password:"",two_password:"",};


          $scope.initTable = function(){
              $('#user_table').bootstrapTable({
                  url: localUrl,         //请求后台的URL（*）
                  method: 'get',                      //请求方式（*）
                  striped: true,                      //是否显示行间隔色
                  sortable: false,                     //是否启用排序
                  sortOrder: "asc",                   //排序方式
                  sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                  clickToSelect:true,
                  columns: [{
                      checkbox: true
                  }, {
                      field: 'id',
                      title: '用户ID',
                      align: 'center'
                  }, {
                      field: 'login_name',
                      title: '用户名',
                      align: 'center'
                  }, {
                      field: 'nick_name',
                      title: '昵称',
                      align: 'center'
                  }, {
                      field: 'email',
                      title: '邮箱',
                      align: 'center'
                  },{
                      field: 'phone',
                      title: '电话',
                      align: 'center'
                  },{
                      field: 'reg_time',
                      title: '注册时间',
                      align: 'center',
                      formatter:function(value,row,index){
                          return DateFormat.format.date(new Date(Number(value)*1000),'yyyy/MM/dd HH:mm');
                      }
                  },{
                      field: 'reg_ip',
                      title: '注册IP',
                      align: 'center'
                  },{
                      field: 'last_login_time',
                      title: '最后登录时间',
                      align: 'center',
                      formatter:function(value,row,index){
                          if(value==0||value=="") return 0;
                          return DateFormat.format.date(new Date(Number(value)*1000),'yyyy/MM/dd HH:mm');
                      }
                  },{
                      field: 'last_login_ip',
                      title: '最后登录IP',
                      align: 'center'
                  },{
                      field: 'status',
                      title: '用户状态',
                      align: 'center',
                      formatter:function(value,row,index){
                          if(value == "0") {
                              return "禁用 ";
                          }
                          if(value == '1') {
                              return "启用";
                          }
                      }
                  }]
              });
          };


          $scope.initModel = function(){

              $scope.modal = $('#modal').modal({show: false});

              $('.create').click(function () {
                 showModal($(this).text());
              });

              $('.refresh').click(function(){
                  $('#user_table').bootstrapTable('refresh');
              });

              $('.removeAll').click(function(){
                  alert('getSelections: ' + JSON.stringify($('#user_table').bootstrapTable('getSelections')));
              });


              function showModal(title, row) {
                  row = row || {
                          id: '',
                          login_name: '',
                          email: '',
                          phone: 0
                      }; // default row value

                  $scope.modal.data('id', row.id);
                  $scope.modal.find('.modal-title').text(title);
                  for (var name in row) {
                      $scope.modal.find('input[name="' + name + '"]').val(row[name]);
                  }
                  $scope.modal.modal('show');
              }


          };




           $scope.save = function(){
/*               httpService.get(url).then(function(success){
                   console.log(JSON.stringify(success.data));
               },function(error){
                   console.log(error);
               });*/
               console.log($scope.user);
               $scope.modal.modal('hide');
        /*       httpService.post(url,data).then(function(result){
                   $scope.back();
               },function(error){

               });*/
           };



           $scope.initTable();
           $scope.initModel();


    }])

});