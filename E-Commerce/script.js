const parentClass = document.getElementById('Ecommerce-container');

const cartItems=document.getElementById('cart-items')

parentClass.addEventListener('click', (e)=>{
    if(e.target.className=='cart-bottom' || e.target.className=='cart-btn-bottom' || e.target.className=='cart-holder'){
        document.querySelector('#cart').style="display:block;"
    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
    if(e.target.className=='add-to-cart'){
        const id=e.target.parentElement.parentElement.id;
        const name=document.querySelector(`#${id} h4`).innerText;
        const image=document.querySelector(`#${id} src`);
        const price=e.target.parentNode.firstElementChild.innerText;
        let total_cart_price=document.getElementById('total-value').innerText;

        if(document.querySelector(`#in-cart-${id}`)){
            alert('This item is already added')
            return
        }
        document.querySelector('.cart-number').textContent=parseInt(document.querySelector('.cart-number').textContent) +1;
        const cartItem=document.createElement('div');
        cartItem.classList.add('cart-row');
        cartItem.setAttribute('id',`in-cart-${id}`);
        total_cart_price=parseFloat(total_cart_price) + parseFloat(price);
        total_cart_price=total_cart_price.toFixed();
        document.getElementById('total-value').textContent=`${total_cart_price}`;
        cartItem.innerHTML=`
        <span class="cart-header">
            <span class="cart-item">${name}</span>
            <span class="cart-price">${price}</span>
            <span class="cart-quantity">
                <input type="text" value="1">
                <button class="remove">REMOVE</button>
            </span>
        </span>
        `
        cartItems.appendChild(cartItem)

        const container=document.querySelector('.notification-container');
        const notification=document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML=`<h4> Your Product : <span>${name}</span> is added to the cart</h4>`;
        container.appendChild(notification);
        setTimeout(()=>{
            notification.remove();
        },2000)
    }

    if(e.target.textContent=='REMOVE'){
        document.querySelector('.cart-number').textContent=parseInt(document.querySelector('.cart-number').textContent) -1;
        let totalCartPrice=document.getElementById('total-value').innerText;
        let removePrice=parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.parentNode.id} .cart-price`).innerText).toFixed()
        totalCartPrice=parseFloat(totalCartPrice)-removePrice;
        document.getElementById('total-value').textContent=`${totalCartPrice}`;
        e.target.parentNode.parentNode.parentNode.remove();
    }

    if(e.target.className=='purchase-buton'){
        if(parseInt(document.querySelector('.cart-number').textContent)===0){
            alert('You have nothing in cart, add some product')
            return
        }
        alert('Thanks for the purchase')
        cartItems.innerHTML="";
        document.getElementById('total-value').innerText=0;
        document.querySelector('.cart-number').textContent=0;

    }
})