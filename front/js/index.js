/**
 * initialize the needed function
 */
async function init(){
    const datas = await tableau()
    afficherTableau(datas)
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
 * shows the products of the api fetch by tableau function
 * @param {Array} datas the data fetched from the api
 */
async function afficherTableau(datas) {
    const product = document.querySelector(".products")
    for (const el of datas){
        product.innerHTML += `
        <article>
            <img src="${el.image}" alt="Titre produit">
            <a href="product.html?id=${el._id}">Buy ${el.shorttitle}</a>
        </article>`
    }   
}
