//设置cookie
function setCookie(key,val,tt){
    //判断是否传递了时间
    if(tt){
        //获取当前时间
        var t1=new Date()
        // tt为上面传来的过期时间
        var time=t1.getTime()+tt*24*3600*1000
        //获取指定结束时间
        time=new Date(time)
        // console.log(time)
        document.cookie=`${key}=${val};expires=${time}`
        
    }else{
        document.cookie=`${key}=${val}`
    }
}
//获取cookie
function getCookie(key){
    /* console.log(document.cookie) */
    //获取所有cookie并转为数组
    var ar1=document.cookie.split('; ')
    var value; //接收指定键对应的值
    //遍历数组中所有元素
    ar1.forEach(function(item){
        //使用=号分割数组元素,获取键名来判断是否和传入的键名相等
        var ar2=item.split('=')
        if(ar2[0]===key){
           value=ar2[1]
        }
    })
    return value;
}

//删除cookie
function delCookie(key,t2){
    setCookie(key,'aa',t2)
}