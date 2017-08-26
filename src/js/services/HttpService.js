/**
 * Created by vitamin on 2017/8/25.
 */
define(['app'], function(app){

    return  app.service('httpService',['$http',function($http){

        var config = {};


        this.get = function(url){
              return  $http.get(url,config);
        };

        this.post = function(url,data){
              return  $http.post(url,data,config);
        };

        this.put = function(url,data){
              return $http.put(url,data,config);
        };

        this.delete = function(url){
             return $http.delete(url,config);
        }

    }]);


});