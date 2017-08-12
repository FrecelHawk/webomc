$(function(){
    		var typeId=localStorage.getItem("typeId") || "";
    		
    		if(typeId=="root"){
			//	console.log("这是root权限");
				$(".names").text(typeId);
				
				$(".tuichu").click(function(){
					location.href="login.html";
				});	
    		}else if(typeId=="test"){
    			$(".names").text(typeId);
    		//	console.log(typeId);
    		//	console.log("这是普通权限")
    			$(".xiTong").hide();
    			$(".liuLang").hide();
    			$(".ziZhi").hide();
    			$(".tuichu").click(function(){
					location.href="login.html";
				});
    			$(".mu").find('li:last').click(function(){
   			//	alert(typeId);
  			   	$.ajax({
					type:"post",
					url:"http://testflow.aociaol.com/userContrl",
					dataTpye:'html',
					data:{typeId:typeId},
					
					success:function(data){
						console.log(data);
					},
				});
			
    		});
    			
    		}
    	});