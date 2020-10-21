var btn=document.querySelector('.btn-z');
var p1=document.querySelector('.b1');
var p2=document.querySelector('.b2');

btn.onclick=function(){
    //获取表单信息
   var user = p1.value;
   var psd = p2.value;
  
    //获取地址栏中的参数信息
    
    //判断地址栏中是否有参数地址
        
        $.ajax({
                url:'../php/inster.php',
                data:{
                    name:user,
                    psd:psd,
                },
                success:function(res){
                    if(res==1){
                        location.href="../login.html"
                    }else{
                        p1.innerHTML='账号或密码错误'
                        p2.innerHTML='账号或密码错误'
                        alert("账号或密码错误，请从新登录")
                    }
                },
            })
}