$(document).ready(function(){
				getCode();
				$(document).keydown(function(e){
					if(e.keyCode==13){
						$("#login").find("#login").trigger("click");
						Login();
					//	alert("er");
					}
				});
			});
			
			var pwdInvisible=document.getElementById("pwdInvisible");
			var pwdVisible=document.getElementById("pwdVisible");
			var passpwd=document.getElementById("passpwd");
			var textpwd=document.getElementById("textpwd");
			var useName=document.getElementById("usename");
			var check=document.getElementById("check");
			
			//设置缓存
			loUser=localStorage.getItem("useName") || "",
			loPass=localStorage.getItem("password") || "";
			useName.value = loUser;
			passpwd.value = loPass;
			if(loUser!== "" && loPass!== ""){
				check.setAttribute("checked","");
			}

			//password值传给text
			function showPwd(){
				var pwd=passpwd.value;
				textpwd.value=pwd;
//				var passwords=textpwd.value=pwd;
				pwdInvisible.style.display="none";
				pwdVisible.style.display="";
				
			}

			//text值传给password
			function hidePwd(){
				var pwd=textpwd.value;
				passpwd.value=pwd;
				pwdVisible.style.display="none";
				pwdInvisible.style.display="";
			}
			
			//加密
			function fisker_encode_v2(s){  
				    var es = [],c='',ec='';  
				    s = s.split('');//10.19补 忘记ie不能下标访问字符串  
				    for(var i=0,length=s.length;i<length;i++){  
				        c = s[i];  
				        ec = encodeURIComponent(c);  
				        if(ec==c){  
				            ec = c.charCodeAt().toString(16);  
				            ec = ('00' + ec).slice(-2);  
				        }  
				        es.push(ec);  
				    }  
				    return es.join('').replace(/%/g,'').toUpperCase();  
				}  
			

			//登陆
			function Login(){
				var useName=$("#usename").val();
				var pwd=$("#passpwd").val();
				//	var pwd=$("#textpwd").val();
				
       			var jiami=fisker_encode_v2(pwd);
		//		alert(jiami);
				var getCode=$("#code").val();
				
				if(useName==""||useName==null){
					alert("请填写账号");
					return false;
				}
				if(pwd==""||pwd==null){
					alert("请填写密码");
					return false;
				}
				if(getCode==""||getCode==null){
					alert("请填写验证码");
					return false;
				}

				$.ajax({
					url:"http://testflow.aociaol.com/auth",
					dataType:'html',
            		type:"post",
					data:{useName:useName,pwd:jiami,getCode:getCode},
					success:function(data){
					//	console.log(data);
						if(data==0||data==1){
							localStorage.setItem("typeId",useName);
							window.location.href="index.html";
						}
						else if(data==-1){
							alert("账号或密码错误");
						}else{
							alert("验证码错误");
						}
					},
					error:function(data){
						alert(data.status+'\n'+data.resposneText+'\n'+"请求失败")
						}
				});
				
				//记住账号密码
				if(check.checked){
					localStorage.setItem("useName",useName);
					localStorage.setItem("password",pwd);
				}else{
					localStorage.setItem("useName","");
					localStorage.setItem("password","");
				}
			}
			
			//验证码
			function getCode(){
				$(".login").find(".passCode").attr("src","http://testflow.aociaol.com/auth_code");
			}