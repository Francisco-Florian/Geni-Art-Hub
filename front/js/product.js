/**
 * initialize the needed function
 */
async function init(){
    const datas = await tableau();
    showProduct(datas)
    ajouterPanier()
};
init()

/**
 * Fetches data from the specified API endpoint.
 * @returns {Promise} A promise that resolves to the JSON response from the API.
 */
async function tableau() {
    const urlParams = new URLSearchParams(window.location.search);
    const idUrl = urlParams.get('id');
    const req = await fetch(`http://localhost:3000/api/products/${idUrl}`);
    return req.json();
};



/**
 * show the selected product details on the DOM
 * @param {array} datas 
 */
async function showProduct(datas) {
    document.querySelector('figure img').src = datas.image;
    document.querySelector('h1').innerHTML = datas.titre;
    document.querySelector('h2').innerHTML = `Description de l’oeuvre : ${datas.titre}`;
    document.querySelector('p').innerHTML = datas.description;
    document.querySelector('#aside').innerHTML = `Description de l’oeuvre : ${datas.titre}`;
    document.querySelector('.button-buy').innerHTML = `Buy ${datas.shorttitle}`;
    for (const declinaison of datas.declinaisons) {
        document.querySelector('select').insertAdjacentHTML('beforeEnd', `<option value="${declinaison.taille}">${declinaison.taille}</option>`);
    };

    document.querySelector('.showprice').innerHTML = `${datas.declinaisons[0].prix}€`;
    const select = document.querySelector('select');
    select.addEventListener('change', () => {
        const taille = select.value;
        for (const declinaison of datas.declinaisons) {
            if (declinaison.taille === taille) {
                document.querySelector('.showprice').innerHTML = `${declinaison.prix}€`;
            }
        };
    });
};

const cart = JSON.parse(localStorage.getItem('cart')) || [];



/**
 * Adds product to the cart in localstorage
 */
function ajouterPanier() {
    const urlParams = new URLSearchParams(window.location.search);
    const select = document.querySelector('select');
    const buy = document.querySelector('.button-buy');

    buy.addEventListener('click', (e) => {
        e.preventDefault()
        const product = {
            id: urlParams.get('id'),
            quant: document.querySelector('#quantity').value,
            declinaison: select.options[select.selectedIndex].value,
        };
        const taille = select.options[select.selectedIndex].value;

        if (document.querySelector('#quantity').value <= 0) {
            alert("La quantité de produit doit être superieur à 0")
        }

        if (document.querySelector('#quantity').value > 100) {
            alert("La quantité maximale de produits ne peut pas dépasser 100")
        }

        if (document.querySelector('#quantity').value > 0 && document.querySelector('#quantity').value <= 100) {
            const productExist = cart.find(item => urlParams.get('id') === item.id && taille === item.declinaison);
            if (productExist) {
                productExist.quant = (parseInt(productExist.quant) + parseInt(product.quant)).toString();
                alert('produit ajouté au panier')
                if (productExist.quant > 100) {
                    productExist.quant = 100;
                    alert("La quantité maximale de produits ne peut pas dépasser 100")
                };
            }
            if (!productExist) {
                cart.push(product)
                alert('produit ajouté au panier')
            }
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    });


}