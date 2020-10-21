
//获取购物车大盒子
var gocart = document.querySelector('#center') 
var shangpin=document.querySelector('.shangpin')
//获取cookie
var login1 = getCookie('login1')
//获取localStorage中是否存在数据
var cartList = JSON.parse(localStorage.getItem('cartList')) || []
var jieshou = location.search
// 数据
// console.log(cartList);
if (login1) {
    if (cartList.length > 0) {
        shopping()
    }
} else {
    alert('您还没有登录，请登录之后再跳转')
    //获取地址栏信息
    var url1 = location.href
    //跳转到登录页面
    location.href = 'login.html?pathname=' + url1;
}


//封装
function shopping() {
    //获取商品总价和数量
    // console.log(shangpin);   //委托事件的盒子

    var ar1=fu1()
    
    var str = ''
        cartList.forEach(item => {
            str += `
            <nav class="shangpin" id="${item.id}">
        <nav class="sp-left">
            <img src="${item.path}" alt="">
        </nav>
        <nav class="sp-right">
            <ul>
                <li>
                    <a href="xianqin.html?id=${item.id}">${item.name} 64GB ${item.colors}</a>
                </li>
                <li class="liselect">
                    <select name="sl" id="shuliang-${item.id}">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </li>
                <li>
                    RMB <i>${item.temp_price}</i>
                    <p><a id="dlt">移除</a></p>
                </li>
            </ul>
            <!-- 2 号ul -->
            <ul>
                <li class="li2">
                    <h6>
                        添加 AppleCare+ 服务计划 (适用于 iPhone 11 Pro 、iPhone 11 Pro Max 、iPhone XS 、iPhone XS Max 或 iPhone X) - RMB 1,799
                    </h6>
                    <h6>
                        <p>获得长达 2 年的技术支持，以及硬件维修和意外损坏保修服务</p>
                    <p><a href="">进一步了解</a></p>
                    </h6>
                </li>
                <li></li>
                <li class="li3">
                    <a href="">添加</a>
                </li>
            </ul>
            <!-- 3号 ul -->
            <ul class="ul3">
                <li class="iconfont icon-xiangzi li5">有现货，可随时发货。
                    <p>了解你何时能收到这件商品。
                        <a href="">选择送货地区</a>
                    </p>
                </li>
            </ul>
        </nav>
        </nav>
            `
        });
        
    shangpin.innerHTML=str

}

 //使用事件委托操作购物车
 shangpin.onclick = function (e) {
    var e = e || window.event
    //获取操作对象
    var tag = e.target || e.srcElement

  
    if(tag.id=="dlt"){
        //获取当前商品对象的id
        var ids = tag.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('id')
        console.log(ids);
        //过滤删除商品
        cartList=cartList.filter(item=>{
            return item.id!=ids
        })
        localStorage.setItem('cartList',JSON.stringify(cartList))
        history.go(0)
        shopping()
    }
}
//结账
jQuery(document).ready(function($) {
	$('#jiezhang').on('click',
	function(event) {
        console.log(this.nextElementSibling.firstElementChild.firstElementChild.innerHTML);
         //获取支付的总价
        var zj=fu1()[1]
        let num=fu1()[0]
        // 渲染 弹出 数量 及 金额
        this.nextElementSibling.firstElementChild.firstElementChild.innerHTML='商品数量：'+num+'件'+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+'确定支付：'+zj+'元'
        event.preventDefault();
        // 样式替换 过程
		$('.cd-popup').addClass('is-visible');
    });
    $('#jiezhang2').on('click',
	function(event) {
         //获取支付的总价
        var zj=fu1()[1]
        let num=fu1()[0]
        // 渲染 弹出 数量 及 金额
        this.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.innerHTML='商品数量：'+num+'件'+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+'确定支付：'+zj+'元'
        event.preventDefault();
        // 样式替换 过程
		$('.cd-popup').addClass('is-visible');
	});
	$('.cd-popup').on('click',
	function(event) {
        // 点击 ('.cd-popup-close,.no') 则关闭窗口
		if ($(event.target).is('.cd-popup-close,.no') || $(event.target).is('.cd-popup')) {
			event.preventDefault();
			$(this).removeClass('is-visible');
        }
        if ($(event.target).is('.yes') || $(event.target).is('.cd-popup')) {
            var t1=$(this)
            let show=document.querySelector('.cd-popup-container')
            show.firstElementChild.innerHTML='支付中...'
            setTimeout(function(){
                let show=document.querySelector('.cd-popup-container')
            show.firstElementChild.innerHTML='支付成功！'
            },1500)
            setTimeout(function(){
                event.preventDefault();
                t1.removeClass('is-visible');
                    //删除已购买的商品
                    cartList=cartList.filter(item=>{
                        localStorage.clear()
                    })
                    localStorage.setItem('cartList',JSON.stringify(cartList))
                    console.log(111);
                    shopping()
            },2000)
			
        }
	});
	$(document).keyup(function(event) {
		if (event.which == '27') {
            // 样式替换 过程
			$('.cd-popup').removeClass('is-visible');
		}
	});
});
// $('#jiezhang').on('click',function(){
//     //获取支付的总价
//     var zj=fu1()[1]
//     let num=fu1()[0]
//     alert('*共计'+num+'件商品'+'\n 确定支付'+zj+'元？')
//     //删除已购买的商品
//     cartList=cartList.filter(item=>{
//         localStorage.clear()
//     })
//     localStorage.setItem('cartList',JSON.stringify(cartList))
//     shopping()
// })

    // 更改数量事件
$('select').on('change',function(){
    // this指向 赋值代理人 n
    var n=this
    var ns=this
    // 获取商品id
    let ids = n.parentNode.parentNode.parentNode.parentNode.getAttribute('id')
    // 遍历商品
    cartList.forEach(item=>{
        //判断当前商品是否被选中
       if(ids==item.id){
        //    赋值按钮数量
        // for(let i=0; i<ns.options.length;i++){
        //     console.log(ns.options);
        // }
        // 赋值小计
        item.temp_price=n.value*parseInt(item.price)
        console.log('实时数量:',n.value,'----','小计：',item.temp_price);
        // 赋值数量
        console.log(item.cart_number);
        item.cart_number=n.value
        console.log(n.value);
        //获取的单价
        var dj=n.parentNode.nextElementSibling.firstChild.nextElementSibling
        // 渲染单价
        dj.innerHTML=item.temp_price
       }
       
    });
    
    localStorage.setItem('cartList',JSON.stringify(cartList))
    fu1()
})

// 针对所选商品数量的总价的操作
function fu1(){
        var num=0;//总数量
        var prices=0;//总价格
        //遍历当前所有商品
        cartList.forEach(item=>{
            //判断当前商品是否被选中
            num+=parseInt(item.cart_number)
            prices+=(parseInt(item.cart_number)*parseFloat(item.price))
            
        })
        var zongjia=document.querySelector('.ct-top')
        zongjia.firstElementChild.firstElementChild.innerHTML=prices
        var zongjia2=document.querySelector('.zj-nav')
        zongjia2.lastElementChild.lastElementChild.innerHTML=prices
        return [num,prices]
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
