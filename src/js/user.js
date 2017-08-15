$(function () {
    function listLoad(){
        $.ajax({
            url: 'http://testflow.aociaol.com/userManage',
            data:{operationMode:'select',realName: 'wwlh',loginPasswd:'123456'},
            type:"post",
            dataType:"html",
            success:function(data){
                // console.log(data);
                var arr  =JSON.parse(data);
                var result = '';
                for(var i=0;i<arr.length;i++){
                    // console.log(arr[i]);
                    var num = i+1;
                    result += '<tr class="good">';
                    result += '<td class="tab1"><input type="checkbox" name="che">'+num+'</td>';
                    result += '<td class="tab2">'+arr[i].loginName+'</td>';
                    result += '<td class="tab3">'+arr[i].realName+'</td>';
                    result += '<td class="tab4">'+arr[i].phone+'</td>';
                    result += '<td class="tab5">'+arr[i].businessId+'</td>';
                    result += '<td class="tab6">'+arr[i].businessKey+'</td>';
                    result += '<td class="tab8">'+arr[i].isGod+'</td>';
                    result += '<td class="tab7"><div id="gai"><span class="change" onclick="self.xiu('+arr[i].userId+')" id="'+arr[i].userId+'">修改</span><span class="del" id="'+arr[i].userId+'" onclick="self.tableDel('+arr[i].userId+')">删除</span></div></td>';
                    result += '</tr>';
                    // [{"userId":"2","loginName":"test","loginPasswd":"123456","realName":"wwlh","title":"just a test","phone":"98765432100","businessId":"110","businessKey":"112","isGod":"1","flag":"0"},{"userId":"3","loginName":"test","loginPasswd":"","realName":"wwlh","title":"just a test","phone":"98765432100","businessId":"110","businessKey":"112","isGod":"1","flag":"0"}]
                }
                $('.userTable').html('');
                $('.userTable').append(result);
            },
            error:function () {

            }
        });
    }
   // listLoad();
});
