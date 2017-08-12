
$(function () {
    var tableRoleId;
    var changeRoleId;
    function roleLoad(){
        $.ajax({
            url: 'http://testflow.aociaol.com/roleManage',
            data:{operationMode:'select'},
            type:"post",
            dataType:"html",
            success:function(data){
                // console.log(data);
                // [{"roleId":"1","roleName":"vvvv","roleDesc":"just a test","createUserId":"321","createDate":"2017-03-29 15:10:47","modifyUserId":"123","modifyDate":"2017-03-29 15:10:47"},{"roleId":"2","roleName":"test2","roleDesc":"just a test","createUserId":"123","createDate":"2017-03-29 15:01:59","modifyUserId":"123","modifyDate":"2017-03-29 15:01:59"},{"roleId":"3","roleName":"test3","roleDesc":"just a test","createUserId":"123","createDate":"2017-03-29 15:01:59","modifyUserId":"123","modifyDate":"2017-03-29 15:01:59"}]
                var arr  =JSON.parse(data);
                var result = '';
                for(var i=0;i<arr.length;i++){
                    // console.log(arr[i]);
                    var num = i+1;
                    result += '<tr class="good">';
                    result += '<td class="tab1"><input type="checkbox" name="che">'+num+'</td>';
                    result += '<td class="tab2">'+arr[i].roleName+'</td>';
                    result += '<td class="tab3">'+arr[i].roleDesc+'</td>';
                    result += '<td class="tab4">'+arr[i].createUserId+'</td>';
                    result += '<td class="tab5">'+arr[i].createDate+'</td>';
                    result += '<td class="tab6">'+arr[i].modifyUserId+'</td>';
                    result += '<td class="tab8">'+arr[i].modifyDate+'</td>';
                    result += '<td class="tab7"><div><span class="change" onclick="role.xiu('+arr[i].roleId+')" id="'+arr[i].roleId+'">修改</span><span class="del" id="'+arr[i].roleId+'" onclick="role.tableRole('+arr[i].roleId+')">删除</span></div></td>';
                    result += '</tr>';
                }
                $('.roleTable').html('');
                $('.roleTable').append(result);
            },
            error:function () {

            }
        });
    }
    roleLoad();
    $('#roleSure').click(function () {
        var roleId = $('#roleDialog .neirong div .roleId').val();
        var roleName = $('#roleDialog .neirong div .roleName').val();
        var roleDis = $('#roleDialog .neirong div .roleDis').val();
        var createId = $('#roleDialog .neirong div .createId').val();
        var changeId = $('#roleDialog .neirong div .changeId').val();
        if(roleId==""||roleName==""||roleDis==""||createId==""||changeId==""){
            alert('请填完表格')
        }else{
            $.ajax({
                url: 'http://testflow.aociaol.com/roleManage',
                data: {operationMode:'add',roleId:roleId,roleName:roleName,roleDesc:roleDis,createUserId:createId,modifyUserId:changeId},
                type: "post",
                dataType: "html",
                success: function (data) {
                    if (data == '4') {
                        alert('用户名已存在')
                    }
                    $("#roleDialog").dialog("close");
                    $('#roleDialog .neirong div .roleId').val('');
                    $('#roleDialog .neirong div .roleName').val('');
                    $('#roleDialog .neirong div .roleDis').val('');
                    $('#roleDialog .neirong div .createId').val('');
                    $('#roleDialog .neirong div .changeId').val('');
                    roleLoad();
                },
                error: function () {

                }
            })
        }
    });
    $('#roleDel').click(function () {
        if(confirm("确定要删除所选项目？")) {
            var checkedList = new Array();
            $(".roleTable .good td input[name='che']:checked").each(function() {
                checkedList.push(Number($(this).parent().text()));
            });
        }
        var e = checkedList.join();
        $.ajax({
            url: 'http://testflow.aociaol.com/roleManage',
            data:{operationMode:'delete',roleIds:e},
            type:"post",
            dataType:"html",
            success:function(data){
                console.log(data);
                $(".roleTable").html("");
                setTimeout(function () {
                    roleLoad();
                },300);
            },
            error:function () {

            }
        });
    });
    role = {
        xiu:function (id) {
            changeRoleId = id;
            // console.log(changeId);
            var roleName = $('#'+id).parent().parent().parent().find('.tab2').html();
            var roleDesc = $('#'+id).parent().parent().parent().find('.tab3').html();
            var createUserId = $('#'+id).parent().parent().parent().find('.tab4').html();
            var modifyUserId = $('#'+id).parent().parent().parent().find('.tab6').html();
            $('#changeRole .neirong div .roleName').val(roleName);
            $('#changeRole .neirong div .roleDis').val(roleDesc);
            $('#changeRole .neirong div .createId').val(createUserId);
            $('#changeRole .neirong div .changeId').val(modifyUserId);
            $("#changeRole").dialog("open");
        },
        changeSure: function () {
            var roleName = $('#changeRole .neirong div .roleName').val();
            var roleDis = $('#changeRole .neirong div .roleDis').val();
            var createId = $('#changeRole .neirong div .createId').val();
            var changeId = $('#changeRole .neirong div .changeId').val();
            if(roleName==""||roleDis==""||createId==""||changeId==""){
                alert('请填完表格')
            }else{
                $.ajax({
                    url: 'http://testflow.aociaol.com/roleManage',
                    data:{operationMode:'modify',roleId:changeRoleId,roleName:roleName,roleDesc:roleDis,createUserId:createId,modifyUserId:changeId},
                    type:"post",
                    dataType:"html",
                    success:function(data){
                        if(data=='4'){
                            alert('用户名已存在')
                        }
                        $('#changeRole').dialog("close");
                        roleLoad();
                    },
                    error:function () {

                    }
                });
            }
        },
        tableRole:function (id) {
            tableRoleId = id;
            if(confirm("确定要删除所选项目？")) {

            }
            $.ajax({
                url: 'http://testflow.aociaol.com/roleManage',
                data:{operationMode:'delete',roleIds:tableRoleId},
                type:"post",
                dataType:"html",
                success:function(data){
                    $(".userTable").html("");
                    setTimeout(function () {
                        roleLoad();
                    },300);
                },
                error:function () {

                }
            });
        }
    };
});
