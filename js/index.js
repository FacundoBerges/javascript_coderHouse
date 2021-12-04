class product{

    constructor(sku, name, price, productType){
        this.sku = sku;
        this.image = sku +".jpg";
        this.name = name;
        this.price = price;
        this.productType = productType;
    }

}


let products = [];

products.push(new product("0", "birdhouse bias", 49.99, "0"));
products.push(new product("5", "santa cruz Iridescent", 49.99, "1"));
products.push(new product("1", "birdhouse skull", 26.99, "0"));
products.push(new product("2", "birdhouse flying falcon", 22.99, "0"));
products.push(new product("8", "Anti-Hero blue", 49.99, "1"));
products.push(new product("6", "santa cruz Screaming Hand Black", 26.99, "0"));
products.push(new product("3", "birdhouse spiral", 49.99, "0"));
products.push(new product("4", "birdhouse triple stack rasta", 59.99, "0"));
products.push(new product("7", "santa cruz Screaming Hand Red", 22.99, "1"));
products.push(new product("9", "Anti-Hero Feeding Frenzy", 59.99, "1"));


function cargarProductos(){
    let contenedor = document.getElementById("cardsContainer");
    let card;

    contenedor.innerHTML = "";
    
    let inputSearch = document.getElementById("search").value.toLowerCase();
    let checkSkates = document.getElementById("cbxSkates");
    let checkDecks = document.getElementById("cbxDecks");

    for(let i = 0; i < products.length; i++){
        switch (true) {
            case (inputSearch != "" && !products[i].name.toLowerCase().match(inputSearch)):
                continue;
            case (!checkSkates.checked && checkSkates.value == products[i].productType):
                continue;
            case (!checkDecks.checked && checkDecks.value == products[i].productType):
                continue;
            default:
                break;
        }

        card = `
        <!-- card -->
        <div class="col-6 col-md-3 col-xl-2 " data-id="${products[i].sku}">
            <div class="row border border-dark p-1 m-1">
                <!-- image -->
                <div class="col-12 ">
                    <img src="img/${products[i].image}" alt="" class="img-fluid">
                </div>

                <!-- title -->
                <div class="col-12 my-3">
                    <h4>${products[i].name}</h4>
                </div>

                <!-- price & buy button -->
                <div class="col-12 mb-4 d-flex align-items-center space-between">
                    <div class="col-6">
                        <span>$ ${products[i].price}</span>
                    </div>
                    <div class="col-6 p-0">
                        <button class="btn btn-secondary w-100 text-center">Buy</button>
                    </div>
                </div>
            </div>
        </div>`;
        contenedor.innerHTML += card;
    }

}

cargarProductos();

let cbxSkates = document.getElementById("cbxSkates");
cbxSkates.addEventListener("change", cargarProductos);
let cbxDecks = document.getElementById("cbxDecks");
cbxDecks.addEventListener("change", cargarProductos);

let search = document.getElementById("search");
search.addEventListener("change", cargarProductos);
search.addEventListener("keyup", cargarProductos);
search.addEventListener("blur", cargarProductos);
