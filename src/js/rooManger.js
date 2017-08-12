$(function() {
        		//加载数据
        		reloads();
        		 $( "#rootDialog" ).dialog({
	                autoOpen:false,
	                modal:true,
	                width:480
	            });
	             $( "#rootDialogs" ).dialog({
	                autoOpen:false,
	                modal:true,
	                width:480
	            });	    	
			    
 			 });
 			 
 			 
 			 //刷新
 			 function reloads(){
 			 	$.ajax({
						url:"http://testflow.aociaol.com/privilegeMange?select",
						dataType:'html',
	            		type:"post",
						success:function(data){
						//	console.log(data);
								var arr=JSON.parse(data);
				 				var result='';
				 				for(var i=0;i<arr.length;i++){
				 					result += '<tr class="opers">';
									result += '<td class="ckId"><input type="checkbox" name="che" value='+arr[i].privilegeId+' id="ck">'+arr[i].privilegeId+'</td>';
									result += '<td>'+arr[i].privilegeMaster+'</td>';
									result += '<td>'+arr[i].privilegeMasterValue+'</td>';
									result += '<td>'+arr[i].privilegeAccess+'</td>';
									result += '<td>'+arr[i].privilegeOperation+'</td>';
									result += '<td class="updaId"><input type="button" name="comme" value="修改"  onclick="updata('+arr[i].privilegeId+')" ><input type="button" name="comme" value="删除"  onclick="deletes('+arr[i].privilegeId+')" ></td>';
									result += '</tr>';
				 				}
				 				$(".operaTable").append(result);
							}
						
					 	});
					}
 			 	
 			 	//打开修改页面
				function updata(id){
					$("#edid").val(id);
					$("#rootDialogs").dialog("open");
				}
				
				function deletes(id){
						if(confirm("确定要删除吗")){
								var arr=id;
							}
						$.ajax({
							url:"http://testflow.aociaol.com/privilegeMange?del",
							dataType:"html",
							type:"post",
							data:{arr:arr},
							success:function(data){
								if(data==-1){
									alert("操作失败")
								}else{
									alert("删除成功");
									$(".operaTable").html('');
									reloads();	
								}
							},
					});
				}
 			 
 			 
 			 
			 oper={
			 		//打开添加对话框
				 	add:function(){
				 		$("#rootDialog").dialog("open");
				 	},
		 	
					//添加返回
				 	retu:function(){
				 		$("#rootDialog").dialog("close");
				 	},
				 	
				 	//修改返回
				 	upretu:function(){
				 		$("#rootDialogs").dialog("close");
				 	},
									
					//添加操作
			 		sure:function(){
				 		var master=$("#master").val();
				 		var priMasVal=$("#priMasVal").val();
				 		var access=$("#access").val();
				 		var opera=$("#opera").val();
//				 		alert(access);
				 		if(master==""||master==null){
				 			alert("用户名称不能为空");
				 			return false;
				 		}
				 		if(priMasVal==""||priMasVal==null){
				 			alert("项目名称不能为空");
				 			return false;
				 		}
				 		if(access==""||access==null){
				 			alert("访问权限不能为空");
				 			return false;
				 		}
				 		if(opera==''||opera==null){
				 			alert("操作权限不能为空");
				 			return false;
				 		}
	
				 		$.ajax({
							url:"http://testflow.aociaol.com/privilegeMange?add",
							dataType:'html',
		            		type:"post",
							data:{master:master,access:access,opera:opera,priMasVal:priMasVal},
							success:function(data){
								if(data==-1){
									alert("操作失败");
									$("#rootDialog").dialog("close");
									}else{
										var arr=JSON.parse(data);
						 				var result='';
						 				for(var i=0;i<arr.length;i++){
						 					result += '<tr class="opers">';
											result += '<td class="ckId"><input type="checkbox" name="che" value='+arr[i].privilegeId+' id="ck">'+arr[i].privilegeId+'</td>';
											result += '<td>'+arr[i].privilegeMaster+'</td>';
											result += '<td>'+arr[i].privilegeMasterValue+'</td>';
											result += '<td>'+arr[i].privilegeAccess+'</td>';
											result += '<td>'+arr[i].privilegeOperation+'</td>';
											result +='<td class="updaId"><input type="button" name="comme" value="修改" onclick="upadta('+arr[i].privilegeId+')"><input type="button" name="comme" value="删除"  onclick="deletes('+arr[i].privilegeId+')" ></td>';
											result += '</tr>';
						 				}
						 				alert("添加成功！");
						 				$(".operaTable").append(result);
						 				$("#rootDialog").dialog("close");
						 				
						 				$("#master").val('');
								 		$("#access").val('');
								 		$("#opera").val('');
								 		$("#priMasVal").val('');
								 	$(".operaTable").html('');
						 				reloads();	
									}
								},
						 	});
					},
					
					//删除操作
					del:function(){
						var check=$('input[name="che"]:checked').length;
					//	alert(check);
						if(check==0){
							alert("删除操作至少选择一个");
							return;
						}
						if(confirm("确定要删除吗？")){
		        			var checkList=new Array();
		        			$('input[name="che"]:checked').each(function(){
		        				checkList.push(Number($(this).parent().text()));
		        				});
		        			var arr=checkList.toString();
		        		}
						$.ajax({
							url:"http://testflow.aociaol.com/privilegeMange?del",
							dataType:"html",
							type:"post",
							data:{arr:arr},
							success:function(data){
								if(data==-1){
									alert("操作失败")
								}else{
									alert("删除成功");
									$(".operaTable").html('');
									reloads();	
								}
							},
						});
					},
					
					//修改
					upda:function(){
						var edid=$("#edid").val();
						var editMaster=$("#editMaster").val();
						var editVal=$("#editVal").val();
						var editAccess=$("#editAccess").val();
						var editOpera=$("#editOpera").val();
					//	alert(id);
						if(edid==""||edid==null){
							alert("id不能为空");
							return false;
						}
						if(editMaster==""||editMaster==null){
							alert("修改的用户名称不能为空");
							return false;
						}
						if(editVal==""||editVal==null){
							alert("修改的项目名称不能为空");
							return false;
						}
						if(editAccess==""||editAccess==null){
							alert("修改的访问权限不能为空");
							return false;
						}
						if(editOpera==""||editOpera==null){
							alert("修改的操作权限不能为空");
							return false;
						}
						
						$.ajax({
							url:"http://testflow.aociaol.com/privilegeMange?modf",
							dataType:'html',
		            		type:"post",
		            		data:{edid:edid,editMaster:editMaster,editAccess:editAccess,editOpera:editOpera,editVal:editVal},
		            		success:function(data){
		            		//	console.log(data);
								if(data==-1){
									alert("操作失败");
									$("#rootDialogs").dialog("close");
									}else{
										var arr=JSON.parse(data);
						 				var result='';
						 				for(var i=0;i<arr.length;i++){
						 					result += '<tr class="opers">';
											result += '<td class="ckId"><input type="checkbox" name="che">'+arr[i].privilegeId+'</td>';
											result += '<td>'+arr[i].privilegeMaster+'</td>';
											result += '<td>'+arr[i].privilegeMasterValue+'</td>';
											result += '<td>'+arr[i].privilegeAccess+'</td>';
											result += '<td>'+arr[i].privilegeOperation+'</td>';
											result +='<td class="updaId"><input type="button" name="comme" value="修改" onclick="oper.updata('+arr[i].privilegeId+')"><input type="button" name="comme" value="删除"  onclick="deletes('+arr[i].privilegeId+')" ></td>';
											result += '</tr>';
						 				}
						 				alert("修改成功！");
						 				$(".operaTable").append(result);
						 				$("#rootDialogs").dialog("close");
						 				
						 				$("#editMaster").val('');
								 		$("#editAccess").val('');
								 		$("#editOpera").val('');
								 		$("#editVal").val('');
								 		$(".operaTable").html('');
						 				reloads();	
									}
								},
						});
						
					},
					
			 	}

