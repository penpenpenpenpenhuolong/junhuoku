jQuery(document).ready(function($) {
    var cartWrapper = $('.cd-cart-container');
    var productId = 0;
    if (cartWrapper.length > 0) {
        var cartBody = cartWrapper.find('.body')
        var cartList = cartBody.find('ul').eq(0);
        console.log(cartList);
        var cartTotal = cartWrapper.find('.checkout').find('span');
        var cartTrigger = cartWrapper.children('.cd-cart-trigger');
        var cartCount = cartTrigger.children('.count')
        var addToCartBtn = $('.cd-add-to-cart');
        var undo = cartWrapper.find('.undo');
        var undoTimeoutId;
        addToCartBtn.on('click', function(event) {
            event.preventDefault();
            addToCart($(this));
        });
        cartTrigger.on('click', function(event) {
            event.preventDefault();
            toggleCart();
        });
        cartWrapper.on('click', function(event) {
            if ($(event.target).is($(this))) toggleCart(true);
        });
        cartList.on('click', '.delete-item', function(event) {
            event.preventDefault();
            removeProduct($(event.target).parents('.product'));
        });
        cartList.on('change', 'select', function(event) {
            quickUpdateCart();
        });
        undo.on('click', 'a', function(event) {
            clearInterval(undoTimeoutId);
            event.preventDefault();
            cartList.find('.deleted').addClass('undo-deleted').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                $(this).off('webkitAnimationEnd oanimationend msAnimationEnd animationend').removeClass('deleted undo-deleted').removeAttr('style');
                quickUpdateCart();
            });
            undo.removeClass('visible');
        });
    }
  
    function toggleCart(bool) {
        var cartIsOpen = (typeof bool === 'undefined') ? cartWrapper.hasClass('cart-open') : bool;
        if (cartIsOpen) {
            cartWrapper.removeClass('cart-open');
            clearInterval(undoTimeoutId);
            undo.removeClass('visible');
            cartList.find('.deleted').remove();
            setTimeout(function() {
                cartBody.scrollTop(0);
                if (Number(cartCount.find('li').eq(0).text()) == 0) cartWrapper.addClass('empty');
            }, 500);
        } else {
            cartWrapper.addClass('cart-open');
        }
    }
  
    function addToCart(trigger) {
        var cartIsEmpty = cartWrapper.hasClass('empty');
        addProduct();
        updateCartCount(cartIsEmpty);
        updateCartTotal(trigger.data('price'), true);
        cartWrapper.removeClass('empty');
    }
  
    function addProduct() {
        productId = productId + 1;
        var productAdded = $('<li class="product"><div class="product-image"><a href="#0"><img src="img/product-preview.png" alt="placeholder"></a></div><div class="product-details"><h3><a href="#0">Product Name</a></h3><span class="price">$25.99</span><div class="actions"><a href="#0" class="delete-item">Delete</a><div class="quantity"><label for="cd-product-' + productId + '">Qty</label><span class="select"><select id="cd-product-' + productId + '" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></div></div></div></li>');
        cartList.prepend(productAdded);
    }
  //删除
    function removeProduct(product) {
        clearInterval(undoTimeoutId);
        cartList.find('.deleted').remove();
        var topPosition = product.offset().top - cartBody.children('ul').offset().top,
            productQuantity = Number(product.find('.quantity').find('select').val()),
            productTotPrice = Number(product.find('.price').text().replace('$', '')) * productQuantity;
        product.css('top', topPosition + 'px').addClass('deleted');
        updateCartTotal(productTotPrice, false);
        updateCartCount(true, -productQuantity);
        undo.addClass('visible');
        undoTimeoutId = setTimeout(function() {
            undo.removeClass('visible');
            cartList.find('.deleted').remove();
        }, 8000);
    }
    // cartList 为 整个商品的盒子
  //数量  价格
    function quickUpdateCart() {
        var quantity = 0;
        var price = 0;
        // cartList.children 为 每条商品的盒子
        cartList.children('li:not(.deleted)').each(function() {
            var singleQuantity = Number($(this).find('select').val());
            console.log(singleQuantity);
            // 总数量
            quantity = quantity + singleQuantity;
            price = price + singleQuantity * Number($(this).find('.price').text().replace('$', ''));
            console.log(price);
        });
        // 总价
        cartTotal.text(price.toFixed(2));
        // 以下为按钮画框缩放 不重要
        cartCount.find('li').eq(0).text(quantity);
        cartCount.find('li').eq(1).text(quantity + 1);
        console.log(quantity);
        console.log(cartTotal.text(price.toFixed(2)));
    }
  
    function updateCartCount(emptyCart, quantity) {
        if (typeof quantity === 'undefined') {
            var actual = Number(cartCount.find('li').eq(0).text()) + 1;
            var next = actual + 1;
            if (emptyCart) {
                cartCount.find('li').eq(0).text(actual);
                cartCount.find('li').eq(1).text(next);
            } else {
                cartCount.addClass('update-count');
                setTimeout(function() {
                    cartCount.find('li').eq(0).text(actual);
                }, 150);
                setTimeout(function() {
                    cartCount.removeClass('update-count');
                }, 200);
                setTimeout(function() {
                    cartCount.find('li').eq(1).text(next);
                }, 230);
            }
        } else {
            var actual = Number(cartCount.find('li').eq(0).text()) + quantity;
            var next = actual + 1;
            cartCount.find('li').eq(0).text(actual);
            cartCount.find('li').eq(1).text(next);
        }
    }
//   删除 函数 调用
    function updateCartTotal(price, bool) {
        bool ? cartTotal.text((Number(cartTotal.text()) + price).toFixed(2)) : cartTotal.text((Number(cartTotal.text()) - price).toFixed(2));
        console.log(bool ? cartTotal.text((Number(cartTotal.text()) + price).toFixed(2)) : cartTotal.text((Number(cartTotal.text()) - price).toFixed(2)));
    }
  });