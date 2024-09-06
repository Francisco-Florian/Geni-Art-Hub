/**
 * initialize the needed function
*/
async function init(){
    const datas = await tableau()
    await displayCart(datas)
    changeQuantity()
    delProduct()
    totalPrice()
}
init()

/**
 * Fetches data from the specified API endpoint.
 * @returns {Promise} A promise that resolves to the JSON response from the API.
 */
async function tableau() {
    const req = await fetch("http://localhost:3000/api/products")
    return req.json();
}


/**
 * show the product in localstorage on cart page
 * @param {array} datas 
 */
async function displayCart(datas){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = document.querySelector('.produit')

    cart.forEach((el, index) => {
        let cartProduct = datas.filter(e => e._id == el.id)
        cartProduct = cartProduct[0]
        const declinaison = cartProduct.declinaisons.filter(index => index.taille == el.declinaison)
        productInCart.innerHTML += `
                        <article data-indexArticle="${index}">
                            <img class="orderImg" src="${cartProduct.image}" alt="Product Image">
                            <h3 class="idOrder" data-productid="${el.id}">${cartProduct.shorttitle}</h3>
                            <p>Prix : ${declinaison[0].prix}€</p>
                            <p class="orderP declinaison" data-format="${el.declinaison}">Format : ${el.declinaison}</p>
                            <p class="orderP">Quantity : <input class="quantityOrder" type="number" data-index="${index}" value="${el.quant}" min="1" max="100" minlength="1" maxlength="3"></p>
                            <a class="supprimer" data-index="${index}" href="#">Supprimer</a>
                        </article>
                        `;
    });
}

/**
 * function that allow to dynamicaly change the quantity of product in the localstorage and the cart
 */
function changeQuantity(){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantity = document.querySelectorAll('.quantityOrder');
    

    quantity.forEach((el) => {
        el.addEventListener('change', (e) => {
            if(el.value > 100){
                el.value = 100;
            }
            if(el.value < 1){
                el.value = 1;
            }
            cart[e.target.dataset.index].quant = parseInt(el.value)
            localStorage.setItem('cart', JSON.stringify(cart))

        })
    })
}


/**
 * function to delete a product from the cart and localstorage
 */
function delProduct(){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const delBtn = document.querySelectorAll('.supprimer');
    
    delBtn.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            e.target.closest('article').remove();
        });
    });
}



/**
 * function to calculate the total price of the products in the cart
 */
function totalPrice(){
    
}




