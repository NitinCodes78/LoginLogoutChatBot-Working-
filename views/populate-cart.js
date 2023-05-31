const itemList = document.querySelector('.items-list');
const cartTable = document.querySelector('.items-table');
const emptycart = document.querySelector('.empty-cart');
const payNow = document.querySelector('.pay-now');
const payableAmt = document.querySelector('.pay-now .amount');
const totalPayableAmt = document.querySelector('.pay-now .total-amount');
const freeDelivery = document.querySelector('.pay-now .free-delivery');


/*````````````````````FOR PAYMENT GATEWAY```````````````````````````*/
let numericAmt = totalPayableAmt.textContent.slice(2);
localStorage.setItem('PAYABLE-AMOUNT', numericAmt );

document.querySelector('.paynow-btn').addEventListener('click',() => {
    location.reload();
})
/*`````````````````````````````````````````````````````````````````*/

function ifEmpty(){
    if(cartItems.length == 0){
        emptycart.style.display = 'flex';    
        cartTable.style.display = 'none';    
        payNow.style.display = 'none';    
    } 
    else{
        emptycart.style.display = 'none';    
        cartTable.style.display = 'block';   
        payNow.style.display = 'flex';   
        populateList(cartItems, itemList);
    }
}

ifEmpty();

function populateList(products, productList) {   //products will be an array of objects
    productList.innerHTML = products.map((product, i) => {
        return `
        <li data-id=${product.productId} data-type=${product.type} data-price=${product.price}>
            <div class="img">
                <img src=${product.bgImgUrl} class="product-img">
                <img src="/images/icons/icon-close.svg" class="delete">
            </div>
            <div class="price">$ ${product.price}</div>
            <div class = "quanSize">
                <div class="quantity"> <input type="number" min="1" value="1"> </div>
                <select name="size">
                    <option value="small">S</option>
                    <option value="medium">M</option>
                    <option value="large">L</option>
                    <option value="xl">XL</option>
                    <option value="xxl">XXL</option>
                </select>
            </div>
            <div class="total-amt">$ ${product.price}</div>
        </li> 
        `;
    }).join('');
}


/*````````````HIDE SIZE OPTION FOR ACCESSORIES`````````````````` */

const liItems = [...document.querySelectorAll('.items-list li')] ;
liItems.forEach(li =>{
    const sizeOption = li.querySelector('.quanSize select');
    if(li.dataset.type == 'accessories') sizeOption.style.display = 'none';
    else return;
})

/*````````````````````QUANTITY X PRICE``````````````````````````` */

const quanInputs = [...document.querySelectorAll('.quantity input')] ;

quanInputs.forEach(input =>{
    input.addEventListener('change',(e)=>{
        const target = e.target.parentElement.parentElement.parentElement;

        const quantity = parseInt(input.value) ;
        let price = parseInt(target.querySelector('.price').innerText.slice(2));
        let totalAmount = target.querySelector('.total-amt');        
        
        totalAmount.innerText =  `$ ${price * quantity}`;


        computeSubtotal() 
    })
})
let finalPrices = [...document.querySelectorAll('.total-amt')];
const subtotal = document.querySelector('.subtotal');

/*````````````````````SUBTOTAL```````````````````````````*/

function computeSubtotal(){
const numericPrices=[];
if(finalPrices.length<1){
    subtotal.innerText =  ``; 
    return;  
}
finalPrices.forEach(price => {
    const numericPrice = parseInt(price.textContent.slice(2));
    numericPrices.push(numericPrice);
    return numericPrices;    
})

const numericSubtotal = numericPrices.reduce((sum,price)=> sum+price);
subtotal.textContent =  `$ ${numericSubtotal}`;
payableAmt.textContent =  `$ ${numericSubtotal}`;

if(numericSubtotal >10000){
    freeDelivery.textContent = '- $50';
    totalPayableAmt.textContent =  `$ ${numericSubtotal}`;
}
else{
    freeDelivery.textContent = 'N.A.';
    totalPayableAmt.textContent =  `$ ${numericSubtotal +50}`;
}
numericAmt = totalPayableAmt.textContent.slice(2);
localStorage.setItem('PAYABLE-AMOUNT', numericAmt );
}
computeSubtotal()

/*`````JS For remove button( removing item from the cart)`````````*/

function removeItem(e){
        const grandParent=e.target.parentElement.parentElement;
        const imgUrl=grandParent.querySelector('.img .product-img').src;
        const removeIndex=cartItems.findIndex(item=>{
               return item.bgImgUrl==imgUrl;
        });
        cartItems.splice(removeIndex,1);
        localStorage.setItem('CART-ITEMS', JSON.stringify(cartItems));

        
        populateList(cartItems,itemList);
        finalPrices=[...document.querySelectorAll('.total-amt')];
        computeSubtotal();

        ifEmpty();

        /******Still doubt on why********** */
        /****I think it's because when we add or remove elements in the removeList, then the event listener associated with it is affected so, we have to initialise the event listener again while in the case of products, we are just adding to the cart, and not adding/removing any product from the product lists*/
        const removeList=document.querySelectorAll('.delete');
        const removeArray=Array.from(removeList);
        removeArray.forEach(remove => {
             remove.addEventListener("click", removeItem);
        });
        
    }
    
    const removeList=document.querySelectorAll('.delete');
    const removeArray=Array.from(removeList);
    removeArray.forEach(remove => {
         remove.addEventListener("click", removeItem);
    });

