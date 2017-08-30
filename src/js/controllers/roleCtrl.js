/**
 * Created by vitamin on 2017/8/25.
 */
define(['app','jquery'],function(app,$){

    return app.controller('roleCtrl',['$scope','httpService',function($scope,httpService){


       $("select").select2({dropdownCssClass: 'dropdown-inverse'});

       $scope.initTable = function(){
           var API_URL = 'http://127.0.0.1:3001/users/';
           var $table = $('#table').bootstrapTable({url: API_URL}),
               $modal = $('#modal').modal({show: false}),
               $alert = $('.alert').hide();

           $(function () {
               // create event
               $('.create').click(function () {
                   showModal($(this).text());
               });

               $('.refresh').click(function(){
                   $table.bootstrapTable('refresh');
               });

               $('.removeAll').click(function(){
                   alert('getSelections: ' + JSON.stringify($table.bootstrapTable('getSelections')));
               });



               $modal.find('.submit').click(function () {
                   var row = {};

                   $modal.find('input[name]').each(function () {
                       row[$(this).attr('name')] = $(this).val();
                   });

                   $.ajax({
                       url: API_URL + ($modal.data('id') || ''),
                       type: $modal.data('id') ? 'put' : 'post',
                       contentType: 'application/json',
                       data: JSON.stringify(row),
                       success: function () {
                           $modal.modal('hide');
                           $table.bootstrapTable('refresh');
                           showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item successful!', 'success');
                       },
                       error: function () {
                           $modal.modal('hide');
                           showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item error!', 'danger');
                       }
                   });
               });
           });


           // update and delete events
           window.actionEvents = {
               'click .update': function (e, value, row) {
                   showModal($(this).attr('title'), row);
               },
               'click .remove': function (e, value, row) {
                   if (confirm('Are you sure to delete this item?')) {
                       $.ajax({
                           url: API_URL + row.id,
                           type: 'delete',
                           success: function () {
                               $table.bootstrapTable('refresh');
                               showAlert('Delete item successful!', 'success');
                           },
                           error: function () {
                               showAlert('Delete item error!', 'danger');
                           }
                       })
                   }
               }
           };

           function showModal(title, row) {
               row = row || {
                       id: '',
                       login_name: '',
                       email: '',
                       phone: 0
                   }; // default row value

               $modal.data('id', row.id);
               $modal.find('.modal-title').text(title);
               for (var name in row) {
                   $modal.find('input[name="' + name + '"]').val(row[name]);
               }
               $modal.modal('show');
           }

           function showAlert(title, type) {
               $alert.attr('class', 'alert alert-' + type || 'success')
                   .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
               setTimeout(function () {
                   $alert.hide();
               }, 3000);
           }
       };

       $scope.initTable();
    }]);
});