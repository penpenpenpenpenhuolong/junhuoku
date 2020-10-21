$lb=$('#lb');
// console.log(lb);
$.ajax({
    url: './js/liebiao.json',
    type: 'GET',
    dataType: 'json',
    success: function (json) {
        // console.log(json);
        var str=''
        $.each(json,function(index,item){
            console.log(item.class);
            if(item.class){
                str+=`
                <ul class="lb-ul">
                <li>
                    <h5><img src="${item.path}" alt=""></h5>
                    <span>${item.name}</span>
                    <p>
                        <i>${item.price}</i>元起
                        <button class="btn-gm" id=${item.id}>购买</button>
                    </p>
                    <span>
                        <button class="btn-xq" id="${item.id}" name=${item.class}>详情</button>
                        <button type="button" class="btn-gwc" id=${item.id}>+购物车</button>
                    </span>
                </li>
                
            </ul>
                `
            }
            
        })
        lb.innerHTML=str;
        console.log(lb);
        //点击购买
        $('.btn-gm').on('click',function(){
            console.dir(this.id);
            var ids=this.id;
            $.each(json,function(index,arr){
                if(index==(ids-1)){
                    console.log(arr);
                    //获取localStorage对象中的cartList
                    var cartList=localStorage.getItem('cartList')
                    //判断cartList是否存在
                    if(cartList){
                        cartList=JSON.parse(cartList)
                        //判断当前添加的商品是否已存在于localStorage中
                        var a=0
                        //遍历cartList中的数据信息
                        cartList.forEach(item=>{
                        if(arr.id==item.id){
                            console.log(arr.id==item.id);
                            item.cart_number=item.cart_number-0+1
                            localStorage.setItem("cartList",JSON.stringify(cartList))
                            a++
                        }
                        })
                        //当a!=1时，localStorage中不存在该商品
                        if(a!=1){
                        arr.cart_number=1
                        //把该商品追加到购物车中
                        cartList.push(arr)
                        localStorage.setItem("cartList",JSON.stringify(cartList))
                        }
                    }else{
                        //商品数量加1
                        arr.cart_number=1
                        //把当前商品信息添加到cartList中
                        localStorage.setItem("cartList",JSON.stringify([arr]))
                    }
                    console.log(cartList);
                }
            })
            location.href="shoppingcart.html"
        })
        //点击详情
        $('.btn-xq').on('click',function(){
            console.dir(this.id)
            location.href="xianqin.html?id="+this.id+""
        })
        //点击加入购物车
        $('.btn-gwc').on('click',function(){
            // location.href="shoppingcart.html?id="+this.id+""
            console.dir(this.id)
            var ids=this.id;
            $.each(json,function(index,arr){
                if(index==(ids-1)){
                    console.log(arr);
                    //获取localStorage对象中的cartList
                    var cartList=localStorage.getItem('cartList')
                    //判断cartList是否存在
                    if(cartList){
                        cartList=JSON.parse(cartList)
                        //判断当前添加的商品是否已存在于localStorage中
                        var a=0
                        //遍历cartList中的数据信息
                        cartList.forEach(item=>{
                        if(arr.id==item.id){
                            console.log(arr.id==item.id);
                            item.cart_number=item.cart_number-0+1
                            localStorage.setItem("cartList",JSON.stringify(cartList))
                            a++
                        }
                        })
                        //当a!=1时，localStorage中不存在该商品
                        if(a!=1){
                        arr.cart_number=1
                        //把该商品追加到购物车中
                        cartList.push(arr)
                        localStorage.setItem("cartList",JSON.stringify(cartList))
                        }
                    }else{
                        //商品数量加1
                        arr.cart_number=1
                        //把当前商品信息添加到cartList中
                        localStorage.setItem("cartList",JSON.stringify([arr]))
                    }
                    console.log(cartList);
                }
            })
            
        })

    }
})

