/**
 * Created by vitamin on 2017/8/25.
 * 数据请求服务
 */
define(['app'], function(app){

    return  app.service('httpService',['$http',function($http){

        var config = {xhrFields: {
            withCredentials: true
        },
            crossDomain: true};


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