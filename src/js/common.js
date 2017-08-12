
$(function () {
    var tableId;
    var changeId;
    $(".leftList li").click(function () {
        if(!$(this).attr('data') == 'data'){
            $(this).find('ul').show();
            $(this).attr('data','data');
        }else{
            $(this).find("ul").show();
            $(this).attr("data","");
        }
    });
    $(".leftList li ul li").click(function (e) {
        e = window.event || e;
        e.stopPropagation();
        $(this).addClass('addColor').siblings().removeClass('addColor');
        $(this).parent().parent().siblings().find('ul li').removeClass('addColor');
        $(this).parent().parent().find('a').addClass('tu');
        $(this).parent().parent().siblings().find('a').removeClass('tu');
        $(this).parent().parent().siblings().find('ul').hide();
        $(this).parent().parent().siblings().attr("data","data");
    });
    $("header .headerLogo .yin").click(function (e) {
        e = window.event || e;
        e.stopPropagation();
        $(this).addClass('headerShadow').siblings().removeClass('headerShadow');
    });

    $(".nameSet").hide();
    $(".myName").mouseover(function(){
        $(".nameSet").show();
        $('.headerName .myName').addClass('nameBack')
    });
    $(".myName").mouseout(function(){
        $('.nameSet').hide();
        $('.headerName .myName').removeClass('nameBack')
    });

    // 用户帐号表单
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

    self = {
        reload: function (name,url) {
            $(name).load(url);
        },
        del: function () {
            if(confirm("确定要删除所选项目？")) {
                var checkedList = new Array();
                $(".userTable .good td input[name='che']:checked").each(function() {
                    checkedList.push(Number($(this).parent().text()));
                });
            }
            // var a = checkedList.toString();
            // var b = JSON.stringify(checkedList);
            var e = checkedList.join();
            $.ajax({
                url: 'http://testflow.aociaol.com/userManage',
                data:{operationMode:'delete',userIds:e},
                type:"post",
                dataType:"html",
                success:function(data){
                    console.log(data);
                    $(".userTable").html("");
                    setTimeout(function () {
                        listLoad();
                    },300);
                },
                error:function () {

                }
            });
        },
        tableDel: function (id) {
            tableId = id;
            if(confirm("确定要删除所选项目？")) {

            }
            $.ajax({
                url: 'http://testflow.aociaol.com/userManage',
                data:{operationMode:'delete',userIds:tableId},
                type:"post",
                dataType:"html",
                success:function(data){
                    $(".userTable").html("");
                    setTimeout(function () {
                        listLoad();
                    },300);
                },
                error:function () {

                }
            });
        },
        sure: function () {
            var userName = $('#userDialog .neirong div .userName').val();
            var userPassword = $('#userDialog .neirong div .userPassword').val();
            var userH = $('#userDialog .neirong div .userHu').val();
            var userPhone = $('#userDialog .neirong div .userPhone').val();
            var businessId = $('#userDialog .neirong div .businessId').val();
            // var businessKey = $('#userDialog .neirong div .businessKey').val();
            var check;
            var list= $('#general:checked').val();
            if(list==null){
                check = 1;
            }
            else{
                check = 0;
            }
            console.log(check);
            if(userName==""||userPassword==""||userH==""||userPhone==""||businessId==""){
                alert('请填完表格')
            }else{
                $.ajax({
                    url: 'http://testflow.aociaol.com/userManage',
                    data: {operationMode:'add',isGod:check,loginName:userName,loginPasswd:userPassword,realName:userH,phone:userPhone,businessId:businessId},
                    type: "post",
                    dataType: "html",
                    success: function (data) {
                        if (data == '4') {
                            alert('用户名已存在')
                        }
                        $("#userDialog").dialog("close");
                        $('#userDialog .neirong div .userName').val('');
                        $('#userDialog .neirong div .userPassword').val('');
                        $('#userDialog .neirong div .userHu').val('');
                        $('#userDialog .neirong div .userPhone').val('');
                        $('#userDialog .neirong div .businessId').val('');
                        listLoad();
                    },
                    error: function () {

                    }
                })
            }
        },
        xiu:function (id) {
            changeId = id;
            // console.log(changeId);
            var loginName = $('#'+id).parent().parent().parent().find('.tab2').html();
            var realName = $('#'+id).parent().parent().parent().find('.tab3').html();
            var phone = $('#'+id).parent().parent().parent().find('.tab4').html();
            var businessId = $('#'+id).parent().parent().parent().find('.tab5').html();
            $('#changeDialog .neirong div .userName').val(loginName);
            $('#changeDialog .neirong div .userHu').val(realName);
            $('#changeDialog .neirong div .userPhone').val(phone);
            $('#changeDialog .neirong div .businessId').val(businessId);
            $("#changeDialog").dialog("open");
        },
        changeSure: function () {
            var userName = $('#changeDialog .neirong div .userName').val();
            var userPassword = $('#changeDialog .neirong div .userPassword').val();
            var userH = $('#changeDialog .neirong div .userHu').val();
            var userPhone = $('#changeDialog .neirong div .userPhone').val();
            var businessId = $('#changeDialog .neirong div .businessId').val();
            if(userName==""||userPassword==""||userH==""||userPhone==""||businessId==""){
                alert('请填完表格')
            }else{
                $.ajax({
                    url: 'http://testflow.aociaol.com/userManage',
                    data:{operationMode:'modify',userId:changeId,loginName:userName,loginPasswd:userPassword,realName:userH,phone:userPhone,businessId:businessId},
                    type:"post",
                    dataType:"html",
                    success:function(data){
                        if(data=='4'){
                            alert('用户名已存在')
                        }
                        $('#changeDialog').dialog("close");
                        listLoad();
                    },
                    error:function () {

                    }
                });
            }
        }
    };
    self.reload('.content','main/user.html');

});