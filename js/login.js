//获取操作元素
var btn=document.querySelector('.btn-dl');
var p1=document.querySelector('.a1');
var p2=document.querySelector('.a2');
btn.onclick=function(){
    //获取表单信息
    var user=document.querySelector('[name="user"]').value
    var psd=document.querySelector('[name="psd"]').value
    //获取地址栏中的参数信息
    
    //判断地址栏中是否有参数地址
        
        $.ajax({
                url:'../php/login.php',
                data:{
                    name:user,
                    psd:psd,
                },
                success:function(res){
                    if(res==1){
                        location.href="../demo.html"
                        console.log(1);
                    
                        
                    }else{
                        p1.innerHTML='账号或密码错误'
                        p2.innerHTML='账号或密码错误'
                        alert("账号或密码错误，请从新登录")
                    }
                },
            })
}