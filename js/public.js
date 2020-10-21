//传入元素id,返回指定id元素
function $id(id){
    return document.getElementById(id)
}

//生成一个n到m之间的随机整数
function rand(n,m){
    return n+parseInt(Math.random()*(m-n+1));
}

//生成一个16进制的随机颜色
function color(){
    var result= "#";
    for(var i=0;i<6;i++){
        result += rand(0,15).toString(16)
        // 把十进制的数字变成十六进制的字符串:0 1 ...9 a b c d f
    }
    return result;
}




//传入一个数组和一个元素,判断数组中是否存在该元素,存在返回true,不存在返回false
function has(arr,data){
    for(var i=0;i<arr.length;i++){
        if(data===arr[i]){
            //continue和break;
            //在此处,循环在函数中,return终止了函数执行,就是终止了循环
            return true;
        }
    }
    //如果函数能运行到此处,说明没有终止函数
    return false;
}




//传入一个数组,返回数组去重以后的结果,不改变原数组
function norepeat(arr){
    var result = [];
    for(var i=0;i<arr.length;i++){
        if(!has(result,arr[i])){
            //如果进入此处,说明arr[i]在result里面不存在,可以放进去
            result.push(arr[i])
        }
    }
    return result;
}