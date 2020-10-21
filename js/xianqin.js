
shopping()
function shopping() {
    var dh=document.querySelector('#na-dh')
    var jieshou = location.search
    console.log(jieshou);
    if (true) {
(async function () {
    //获取地址栏中的数据信息
    var urls = location.href
    //以？分割数据信息
    var str = urls.split('?id=')[1]  //id=n
    console.log(str);
    return await PromiseAjax({
        url: 'php/shoppingcart.php?' + str
    })
})().then(function (data) {
    //转为json对象
        var ctr=document.querySelector('#center')
        console.log(ctr);
        var domes = jieshou.split('?id=')[1]
        var dt = eval('(' + data + ')')
        var str = ''
        if (!isNaN(domes)) {
            console.log(dt);
            $.each(dt, function (index, arr) {
                if (index == (domes - 1)) {
                str+=`
                <nav class="na-cenctr">
                <nav class="na-cenctr-left"><a href="">${arr.name}</a></nav>
                <ul>
                    <li><a href="liebiao.html">概括</a></li>
                    <li><a href="liebiao.html">macOS</a></li>
                    <li><a href="goumai.html">购买</a></li>
                </ul>
            </nav>
                `
                dh.innerHTML=str
                console.log(dh)
                var skr=`
                <p><img src="${arr.image_a}" alt=""></p>
                <p><img src="${arr.image_b}" alt=""></p>
                <p><img src="${arr.image_c}" alt=""></p>
                <p><img src="${arr.image_d}" alt=""></p>
                <p><img src="${arr.image_e}" alt=""></p>
                <p><img src="${arr.image_f}" alt=""></p>
                <p><img src="${arr.image_g}" alt=""></p>
                <p><img src="${arr.image_h}" alt=""></p>
                <p><img src="${arr.image_i}" alt=""></p>
                `
                $('#center').append(skr);
                }

            })
            ;

        }
    })
}
}