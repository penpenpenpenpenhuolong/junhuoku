// 放大镜
var n=0
let bd_left = document.getElementsByClassName('bd-left')[0]
let nav = document.querySelector('.bd-left>nav')
let img = document.createElement('img')
let divimg=document.querySelector('.divimg')
switch(n){
    case 0:
        img.src="../image/03.jpg"
        break;
    case 1:
        img.src="../image/macbook-air-202002-gallery1.jpg"
        break;
    case 2:
        img.src="../image/macbook-air-202002-gallery2_GEO_CN.jpg"
        break;
    case 3:
        img.src="../image/macbook-air-202002-gallery3.jpg"
        break;
    case 4:
        img.src="../image/macbook-air-202002-gallery5.jpg"
        break;

}
img.className='img1'
divimg.appendChild(img)
// img 放大镜图
let boxmin=document.querySelector('.boxmin')
let rightbox=document.querySelector('.rightBox')
let boximg=document.querySelector('.rightBox>img')
console.log(boximg);

// img下的略缩图
let div=document.createElement('div')
div.style.height=70+'px'
div.style.display='flex'
div.style.justifyContent="space-around"
div.style.alignItems="center"
div.className="min-div"
let str=`<img class="xiaotu imgshow" src="../image/1.jpg" style=""><img class="xiaotu" src="../image/2.jpg" style=""><img class="xiaotu" src="../image/3.jpg" style=""><img class="xiaotu" src="../image/4.jpg" style=""><img class="xiaotu" src="../image/xm4.jpg" style="">`
bd_left.insertBefore(div,nav)
div.innerHTML=str
let xiaotu=document.querySelectorAll('.xiaotu')
for(let i=0;i<=xiaotu.length-1;i++){
    console.log(xiaotu[i]);
    xiaotu[i].onclick=function(){
        for(let j=0;j<=xiaotu.length-1;j++){
            xiaotu[j].className=''
        }
        xiaotu[i].className='imgshow'
        switch(i){
            case 0:
                img.src="../image/1.jpg"
                boximg.setAttribute('src',img.src)
                break;
            case 1:
                img.src="../image/2.jpg"
                boximg.setAttribute('src',img.src)
                break;
            case 2:
                img.src="../image/3.jpg"
                boximg.setAttribute('src',img.src)
                break;
            case 3:
                img.src="../image/4.jpg"
                boximg.setAttribute('src',img.src)
                break;
            case 4:
                img.src="../image/xm4.jpg"
                boximg.setAttribute('src',img.src)
                break;
        
        }
    }
}
// 放大镜 放大处

function exercise(e){
     //获取光标相对于box对象的位置
     var x=e.clientX-bd_left.offsetLeft-boxmin.offsetWidth/2
     var y=e.clientY-bd_left.offsetTop-10-boxmin.offsetHeight/2
     //设置边界条件
     var minX=0,minY=0
     var maxX=divimg.offsetWidth-boxmin.offsetWidth
     var maxY=divimg.offsetHeight-boxmin.offsetHeight
     //判断水平方向
     if(x<=minX){
         x=minX
     }else if(x>=maxX){
         x=maxX
     }
     boxmin.style.left=x+'px'

     //判断垂直方向
     if(y<=minY){
         y=minY
     }else if(y>=maxY){
         y=maxY
     }
     boxmin.style.top=y+'px'
     //给当前的图片对象设置偏移量
     boximg.style.top=-2*y+'px'
     boximg.style.left=-1.5*x+'px'
}
// 当移入时
divimg.onmouseover=function(e){
    var e = e || window.event
    rightbox.style.display='block'
    boxmin.style.display="block"
    exercise(e)
}
divimg.onmousemove=function(e){
    var e = e || window.event
    exercise(e)
}
// 当移出时
divimg.onmouseout=function(){
    rightbox.style.display='none'
    boxmin.style.display='none'
}


// 轮播图
let lunbo = document.getElementById('lunbo')
let imgs = document.getElementsByClassName('imgs')[0].children
let left1 = document.getElementsByClassName('lunbo-sp-left')[0]
let right1 = document.getElementsByClassName('lunbo-sp-right')[0]
let lb_btm = document.getElementsByClassName('lunbo-btm')[0].children
// console.log(lb_btm);
// console.log(right1);
// console.log(left1);
// console.log(imgs);
// console.log(lunbo);
var dsq1,dsq2   //定时器
var index=0
move(imgs[0],100)
autoGo()
function autoGo(){
    dsq1=setInterval(function(){
        imgs[index].style.opacity=0.1
        // 将图片层级减少
        imgs[index].style.zIndex=1
        // 清空class 属性
        lb_btm[index].className=""
        if(index==imgs.length-1){
            index=0
        }else{
            index++
        }
        // 把下张图片层级放大
        imgs[index].style.zIndex=2
        // 把按钮添加 动态样式
        lb_btm[index].className='lunbo-show'
        move(imgs[index],100)
    },5000)
}
function move(dom,end){
    var opa=10 //图片透明度
    clearInterval(dsq2)
    dsq2=setInterval(function(){
        if(end>opa){
            var speed = 2
        }else{
            var speed = -2
        }
        // 临界条件
        if(Math.abs(end-opa)<=Math.abs(speed)){
            clearInterval(dsq2)
            dom.style.opacity=end/100
        }else{
            opa+=speed
            dom.style.opacity=opa/100
        }
    },5)
    imgss()
}
// 停止定时器
lunbo.onmouseover=function(){
    clearInterval(dsq1)
    left1.style.zIndex=4
    right1.style.zIndex=4
}
lunbo.onmouseleave=function(){
    left1.style.zIndex=1
    right1.style.zIndex=1
    autoGo()
}
// 左按钮事件
left1.onclick=function(){
    imgs[index].style.zIndex=1
    imgs[index].style.opacity=0.1
    lb_btm[index].className=''
    if(index==0){
        index=imgs.length-1
    }else{
        index--
    }
    imgs[index].style.zIndex=2
    lb_btm[index].className='lunbo-show'
    move(imgs[index],100)
    imgss()
}
// 右按钮事件
right1.onclick=function(){
    imgs[index].style.opacity=0.1
    imgs[index].style.zIndex=1
    lb_btm[index].className=''
    if(index==imgs.length-1){
        index=0
    }else{
        index++
    }
    imgs[index].style.zIndex=2
    lb_btm[index].className='lunbo-show'
    move(imgs[index],100)
    imgss()
}
// 点击图片 跳转
function imgss(){
    for(let i =0;i<=index;i++){
        imgs[i].onclick=function(){
            window.location.href="xianqin.html?id=1";
        }
    }
}