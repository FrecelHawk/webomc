	$(function() {
        		//加载数据
        		reloads();
		    	
		    	$( "#funDialog" ).dialog({
	                autoOpen:false,
	                modal:true,
	                width:480
	            });
	             $( "#funDialogs" ).dialog({
	                autoOpen:false,
	                modal:true,
	                width:480
	            });
			    
 			 });
 			 
 			 function deletes(id){

					if(confirm("确定要删除吗")){
							var arr=id;
						}
					$.ajax({
						url:"http://testflow.aociaol.com/sys_menu?del",
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
 			 
 			 
 			 //刷新
 			 function reloads(){
 			 	$.ajax({
						url:"http://testflow.aociaol.com/sys_menu?select",
						dataType:'html',
	            		type:"post",
						success:function(data){
						//	console.log(data);
								var arr=JSON.parse(data);
				 				var result='';
				 				for(var i=0;i<arr.length;i++){
				 					result += '<tr class="opers">';
									result += '<td class="ckId"><input type="checkbox" name="che" value='+arr[i].menuId+' id="ck">'+arr[i].menuId+'</td>';
									result += '<td>'+arr[i].menuName+'</td>';
									result += '<td>'+arr[i].menuUrl+'</td>';
									result += '<td>'+arr[i].projectId+'</td>';
									result += '<td class="updaId"><input type="button" name="comme" value="修改"  onclick="updata('+arr[i].menuId+')" ><input type="button" name="comme" value="删除"  onclick="deletes('+arr[i].menuId+')" ></td>';
									result += '</tr>';
				 				}
				 				$(".operaTable").append(result);
							}
						
					 	});
					}
 			 	
		 	//打开修改页面
			function updata(id){
				$("#edid").val(id);
//				var names=$(doms).parents().find("td:eq(1)").html();
//				var urls=$(doms).parents().find("td:eq(2)").html();
//				var proId=$(doms).parents().find("td:eq(3)").html();
//				$("#editMenuMane").val(names);
//				$("#editMenuUrl").val(urls);
//				$("#editProjectId").val(proId);
				
				$("#funDialogs").dialog("open");
			}
 			 
 			 
			 menu={
			 		//打开添加对话框
				 	add:function(){
				 		$("#funDialog").dialog("open");
				 	},
				 	
					//添加返回
				 	retu:function(){
				 		$("#funDialog").dialog("close");
				 	},
				 	
				 	//修改返回
				 	upretu:function(){
				 		$("#funDialogs").dialog("close");
				 	},
									
					//添加操作
			 		sure:function(){
				 		var menuName=$("#menuName").val();
				 		var menuUrl=$("#menuUrl").val();
						var projectId=$("#projectId").val();
						
				 		if(menuName==""||menuName==null){
				 			alert("项目名称不能为空");
				 			return false;
				 		}
				 		if(menuUrl==""||menuUrl==null){
				 			alert("项目链接不能为空");
				 			return false;
				 		}
				 		if(projectId==""||projectId==null){
				 			alert("项目编号不能为空");
				 			return false;
				 		}
	
				 		$.ajax({
							url:"http://testflow.aociaol.com/sys_menu?add",
							dataType:'html',
		            		type:"post",
							data:{menuName:menuName,menuUrl:menuUrl,projectId:projectId},
							success:function(data){
							//	console.log(data);
								if(data==-1){
									alert("操作失败");
									$("#funDialog").dialog("close");
									}else{
										var arr=JSON.parse(data);
						 				var result='';
						 				for(var i=0;i<arr.length;i++){
						 					result += '<tr class="opers">';
											result += '<td class="ckId"><input type="checkbox" name="che" value='+arr[i].menuId+' id="ck">'+arr[i].menuId+'</td>';
											result += '<td>'+arr[i].menuName+'</td>';
											result += '<td>'+arr[i].menuUrl+'</td>';
											result += '<td>'+arr[i].projectId+'</td>';
											result +='<td class="updaId"><input type="button" name="comme" value="修改" onclick="upadta('+arr[i].menuId+')"><input type="button" name="comme" value="删除"  onclick="deletes('+arr[i].menuId+')" ></td>';
											result += '</tr>';
						 				}
						 				alert("添加成功！");
						 				$(".operaTable").append(result);
						 				$("#funDialog").dialog("close");
						 				
						 				$("#menuName").val('');  
								 		$("#menuUrl").val('');
								 		$("#projectId").val('');
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
							url:"http://testflow.aociaol.com/sys_menu?del",
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
						var editMenuMane=$("#editMenuMane").val();
						var editMenuUrl=$("#editMenuUrl").val();
						var editProjectId=$("#editProjectId").val();
						
						if(edid==""||edid==null){
							alert("id不能为空");
							return false;
						}
						if(editMenuMane==""||editMenuMane==null){
							alert("修改的项目名称不能为空");
							return false;
						}
						if(editMenuUrl==""||editMenuUrl==null){
							alert("修改的项目链接不能为空");
							return false;
						}
						if(editProjectId==''||editProjectId==null){
							alert("修改的项目编号不能为空");
							return false;
						}

						
						$.ajax({
							url:"http://testflow.aociaol.com/sys_menu?modf",
							dataType:'html',
		            		type:"post",
		            		data:{edid:edid,editMenuMane:editMenuMane,editMenuUrl:editMenuUrl,editProjectId:editProjectId},
		            		success:function(data){
		            			console.log(data);
								if(data==-1){
									alert("操作失败");
									}else{
										var arr=JSON.parse(data);
						 				var result='';
						 				for(var i=0;i<arr.length;i++){
						 					result += '<tr class="opers">';
											result += '<td class="ckId"><input type="checkbox" name="che">'+arr[i].menuId+'</td>';
											result += '<td>'+arr[i].menuName+'</td>';
											result += '<td>'+arr[i].menuUrl+'</td>';
											result += '<td>'+arr[i].projectId+'</td>';
											result +='<td class="updaId"><input type="button" name="comme" value="修改" onclick="oper.updata('+arr[i].menuId+')"><input type="button" name="comme" value="删除"  onclick="deletes('+arr[i].menuId+')" ></td>';
											result += '</tr>';
						 				}
						 				alert("修改成功！");
						 				$(".operaTable").append(result);
						 				$("#funDialogs").dialog("close");
						 				
						 				$("#editMenuUrl").val('');
								 		$("#editMenuMane").val('');
								 		$("#editProjectId").val('');
								 		$(".operaTable").html('');
						 				reloads();	
									}
								}
						});
						
				}
					

			}