function ajax(options){
    //设置默认参数
    var obj={
        url:"",
        type:'get',
        async:'true',
        data:'',
        chenggong:function(){},
        shibai:function(){}
    }
    //把传入的参数赋值给默认对象
    for(var attr in options){
        //把传入参数和默认参数键名相同的值，赋值给默认参数
        obj[attr]=options[attr]
    }
    //创建对象
    var xhr=new XMLHttpRequest() ||new ActiveXObject('Microsoft.XMLHTTP')
    
    //判断是否有请求参数
    if(obj.data){
        //判断请求方式
        if(obj.type.toLowerCase()=='get'){
            //配置信息
            xhr.open(obj.type,obj.url+'?'+obj.data,obj.async)
            //发送请求
            xhr.send();
        }else if(obj.type.toLowerCase()=="post"){
            //配置信息
            xhr.open(obj.type,obj.url,obj.async)
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
            //发送请求
            xhr.send(obj.data)
        }
    }else{
        //配置信息
        xhr.open(obj.type,obj.url,obj.async)
        //发送请求
        xhr.send()
    }

    //接收响应结果，并解析
    xhr.onreadystatechange=function(){
        //判断ajax状态是否结束
        if(xhr.readyState==4){
            if(xhr.status==200){
                obj.chenggong(xhr.responseText)
            }else{
                obj.shibai('请求失败')
            }
        }
    }
}

function PromiseAjax(options){
    return new Promise(function(resolve,reject){
        //设置默认参数
            var obj={
                url:"",
                type:'get',
                async:'true',
                data:'',
                chenggong:function(){},
                shibai:function(){}
            }
            //把传入的参数赋值给默认对象
            for(var attr in options){
                //把传入参数和默认参数键名相同的值，赋值给默认参数
                obj[attr]=options[attr]
            }
            //创建对象
            var xhr=new XMLHttpRequest() ||new ActiveXObject('Microsoft.XMLHTTP')
            
            //判断是否有请求参数
            if(obj.data){
                //判断请求方式
                if(obj.type.toLowerCase()=='get'){
                    //配置信息
                    xhr.open(obj.type,obj.url+'?'+obj.data,obj.async)
                    //发送请求
                    xhr.send()
                }else if(obj.type.toLowerCase()=="post"){
                    //配置信息
                    xhr.open(obj.type,obj.url,obj.async)
                    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
                    //发送请求
                    xhr.send(obj.data)
                }
            }else{
                //配置信息
                xhr.open(obj.type,obj.url,obj.async)
                //发送请求
                xhr.send()
            }

            //接收响应结果，并解析
            xhr.onreadystatechange=function(){
                //判断ajax状态是否结束
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        resolve(xhr.responseText)
                    }else{
                        reject('请求失败')
                    }
                }
            }
    })
}