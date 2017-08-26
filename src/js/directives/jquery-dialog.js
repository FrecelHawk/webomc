/**
 * Created by vitamin on 2017/8/24.
 */
define(['jquery','app'], function ($,app) {

    app.directive('openDialog', [function () {
        return {
            restrict: 'AE',
            link: function (scope, ele, attr) {
                $(attr.openDialog).dialog({
                    autoOpen:false,
                    modal:true,
                    width:480
                });

            }
        }
    }])

});
