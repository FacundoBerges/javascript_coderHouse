window.addEventListener("load", totalPrice);
window.addEventListener("load", displayCartProducts);
document.getElementById("cartButton").addEventListener("click", showCart);



function defineCart(){
    if(localStorage.cart == undefined){
        localStorage.setItem("cart", JSON.stringify([]));
    }
}

defineCart();


//          ---------- Simulacion de base de datos con productos ----------
class product{
    constructor(sku, name, price, productType){
        this.sku = sku;
        this.image = sku +".png";
        this.name = name;
        this.price = price;
        this.productType = productType;
    }
}

let products = [];
products.push(new product("0", "Birdhouse Bias Team", 49.99, "0"));
products.push(new product("5", "Santa Cruz Iridescent Hand", 49.99, "1"));
products.push(new product("1", "Birdhouse Hawk Skull", 26.99, "0"));
products.push(new product("3", "Birdhouse Hawk Spiral", 49.99, "0"));
products.push(new product("17", "Element Jackass", 59.99, "2"));
products.push(new product("4", "Birdhouse Triple Stack Rasta", 59.99, "0"));
products.push(new product("7", "Santa Cruz Screaming Hand Red", 22.99, "1"));
products.push(new product("23", "Element Park Urethane", 59.99, "3"));
products.push(new product("9", "Anti-Hero Feeding Frenzy", 59.99, "1"));
products.push(new product("10", "Element Bark Camo Script", 59.99, "1"));
products.push(new product("11", "Element Made to Endure", 59.99, "0"));
products.push(new product("12", "Element Nyjah Huston's Represent", 59.99, "1"));
products.push(new product("13", "Element Hatched Red / Blue", 59.99, "0"));
products.push(new product("14", "Element Floral Party", 59.99, "0"));
products.push(new product("24", "Element Trip Out", 59.99, "3"));
products.push(new product("15", "Element Trinity", 59.99, "2"));
products.push(new product("2", "Birdhouse TH Flying Falcon", 22.99, "0"));
products.push(new product("8", "Anti-Hero Blue", 49.99, "1"));
products.push(new product("6", "Santa Cruz Screaming Hand Black", 26.99, "0"));
products.push(new product("16", "Element Classic White / Red", 59.99, "2"));
products.push(new product("18", "Element Blazin", 59.99, "0"));
products.push(new product("19", "Spitfire Formula Four White / Green", 59.99, "3"));
products.push(new product("20", "Spitfire Formula Four Orange / Black", 59.99, "3"));
products.push(new product("22", "Spitfire Bighead", 59.99, "3"));
products.push(new product("26", "Toy Machine Vice Monster", 59.99, "1"));
products.push(new product("27", "Toy Machine Monster Blue", 59.99, "1"));
products.push(new product("21", "Spitfire Formula Four KB After midnight Conical", 59.99, "3"));
products.push(new product("28", "Toy Machine Monster Yellow", 59.99, "0"));
products.push(new product("25", "Element Recuerda White / Gold", 59.99, "3"));


//          ---------- Carga de productos en HTML y filtros de busqueda ----------

let cbxSkates = $("#cbxSkates");
cbxSkates.on("change", loadProducts);
let cbxDecks = $("#cbxDecks");
cbxDecks.on("change", loadProducts);
let cbxTrucks = $("#cbxTrucks");
cbxTrucks.on("change", loadProducts);
let cbxWheels = $("#cbxWheels");
cbxWheels.on("change", loadProducts);

let search = $("#search");
search.on("change", loadProducts);
search.on("keyup", loadProducts);
search.on("blur", loadProducts);

function loadProducts(){
    let container = document.getElementById("cardsContainer");
    let card;
    
    container.innerHTML = "";
    
    //Busqueda por filtro de busqueda y checkBox 
    let inputSearch = document.getElementById("search").value.toLowerCase();
    let checkSkates = document.getElementById("cbxSkates");
    let checkDecks = document.getElementById("cbxDecks");
    let checkTrucks = document.getElementById("cbxTrucks");
    let checkWheels = document.getElementById("cbxWheels");
    
    for(let i = 0; i < products.length; i++){
        switch (true) {
            case (inputSearch != "" && !products[i].name.toLowerCase().match(inputSearch)):
                continue;
            case (!checkSkates.checked && checkSkates.value == products[i].productType):
                continue;
            case (!checkDecks.checked && checkDecks.value == products[i].productType):
                continue;
            case (!checkTrucks.checked && checkTrucks.value == products[i].productType):
                continue;
            case (!checkWheels.checked && checkWheels.value == products[i].productType):
                continue;
            default:
                break;
        }

        card = `
        <!-- card -->
        <div class="col-6 col-md-4 col-lg-3 pb-2" >
            <div class="row p-1 m-1">
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
                        <button class="btn btn-secondary w-100 text-center addToCart" data-id="${products[i].sku}">Buy</button>
                    </div>
                </div>
            </div>
        </div>`;
        container.innerHTML += card;
    }
}

loadProducts();



//          ---------- Funciones relacionadas al carrito de compras ----------
// Lectura de botones
let buyButtons = document.querySelectorAll(".addToCart");

for(let button of buyButtons){
    button.addEventListener("click", addToCart);
    button.addEventListener("click", totalPrice);
    button.addEventListener("click", displayCartProducts);
}


// Mostrar/ocultar carrito
function showCart(){
    document.getElementById("cartMenu").classList.toggle("cartMenuOpen");
}


// Crea cartas para mostrar items en carrito 
function displayCartProducts(){
    document.getElementById("cartList").innerHTML = ""; //Limpio el carrito
    
    let auxCart = JSON.parse(localStorage.cart);
    for (let i = 0; i < auxCart.length; i++) {        
        let cartItem = `
        <div class="row my-4 py-2 border border-dark rounded bg-white" id="itemId-${auxCart[i].sku}">
            <div class="col-4 col-md-5 col-lg-6">
                <img src="img/${auxCart[i].image}" alt="" class="img-fluid">
            </div>
            <div class="col d-flex flex-wrap align-items-center justify-content-between">
                <div>
                    <h5>${auxCart[i].name}</h5>
                    <span>$ ${auxCart[i].price}</span>
                    <p class="fw-bold">x${auxCart[i].quantity}</p>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <button type="button" class="btn btn-danger text-wrap" id="deleteItem-${auxCart[i].sku}" data-id="${auxCart[i].sku}">Delete Item</button>
                    </div>
                    <div class="d-flex align-items-center">
                        <button type="button" class="btn btn-warning fw-bolder quantityUpdate" data-id="${auxCart[i].sku}" data-action="-">-</button>
                        <button type="button" class="btn btn-info fw-bolder quantityUpdate" data-id="${auxCart[i].sku}" data-action="+">+</button>
                    </div>
                </div>
            </div>
        </div>`;

        document.getElementById("cartList").insertAdjacentHTML("beforeend", cartItem);
        document.getElementById(`deleteItem-${auxCart[i].sku}`).addEventListener("click", deleteItem);
    }

    $(".quantityUpdate").on("click", quantityUpdate);
}

// Anade compra al carrito (JSON)
function addToCart(){
    let flagCarrito = false;
    let auxCart = JSON.parse(localStorage.cart);

    for (let i = 0; i < auxCart.length; i++){
        if (auxCart[i].sku == this.dataset.id){
            auxCart[i].quantity += 1;
            flagCarrito = true;
            break;
        }
    }

    if(flagCarrito == false){
        let product = searchById(this.dataset.id);
        product.quantity = 1;
        auxCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(auxCart));
    displayCartProducts();
}

function searchById(id){
    for(let i = 0; i < products.length; i++){
        if(id == products[i].sku){
            return products[i];
        }
    }
    return false;
}


function quantityUpdate(){
    let auxCart = JSON.parse(localStorage.cart);

    for (let i = 0; i < auxCart.length; i++){
        if (auxCart[i].sku == this.dataset.id){
            if (this.dataset.action == "-") {
                if (auxCart[i].quantity > 1) {
                    auxCart[i].quantity -= 1;
                }
                else{
                    document.getElementById(`itemId-${auxCart[i].sku}`).remove()
                    auxCart.splice(i,1);
                    break;
                    //$(`#deleteItem-${auxCart[i].sku}`).click();
                }
            }
            else if (this.dataset.action == "+") {
                auxCart[i].quantity += 1;
            }
            break;
        }
    }

    localStorage.setItem("cart", JSON.stringify(auxCart));
    totalPrice();
    displayCartProducts();
}


// Muestra total a pagar 
function totalPrice(){
    let auxCart = JSON.parse(localStorage.cart);
    let total = 0;
    for(product of auxCart){
        total += (product.price * product.quantity);
    }
    
    document.getElementById("totalCart").innerHTML = "$ "+ total.toFixed(2);
}


document.getElementById("cancelCart").addEventListener("click", deleteCart);
document.getElementById("proceedBuying").addEventListener("click", deleteCart);


function deleteItem(){
    let auxCart = JSON.parse(localStorage.cart);
    for(let i = 0; i < auxCart.length; i++){
        if (auxCart[i].sku == this.dataset.id) {
            document.getElementById(`itemId-${auxCart[i].sku}`).remove()
            auxCart.splice(i,1);
            break;
        }
    }
    localStorage.setItem("cart", JSON.stringify(auxCart));
    totalPrice();
}


function deleteCart(){
    localStorage.removeItem("cart");
    defineCart();
    totalPrice();
    displayCartProducts();
    // Aviso para saber si se pulso el boton cancelar o continuar compra.
    if (this.id == "proceedBuying") {
        alert("Pagina en mantenimiento :(");
    }
}


//          ---------- Informacion de clima actual ----------

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=7ed210cd63a6d46fcc0613cb40d3ca60&units=metric";
        let weatherContainer = document.getElementById("weatherContainer");
        weatherContainer.innerHTML = "";

        $.get(url, function(data){
            let iconName = data.weather[0].icon;
            let iconUrl = "http://openweathermap.org/img/wn/"+iconName+"@2x.png";
            let weather = 
            `
            <!-- weather -->
            <div class="row border border-dark p-3 m-3">
            <div class="col-12 text-center">
            <h2>${data.name}</h2>
            </div>
            <div class="col-6 space-between d-flex text-center align-items-center">
            <div class="col-6 col-md-4 col-lg-3" id="icon">
            <img id="weatherIcon" src="" alt="Weather icon">
            </div>
            <div class="col-6 col-md-8 col-lg-9">
            <h4>weather: ${data.weather[0].main}</h4>
            <p>${data.weather[0].description}</p>
            </div>
            
            </div>
            <div class="col-6 mt-4">
            <p>temperature: <strong>${data.main.temp} °C</strong> (feels like ${data.main.feels_like}°)</p>
            <p>Min. temp: ${data.main.temp_min}° / Max. temp: ${data.main.temp_max}°</p>
            </div>
            </div>
            `;
            
            weatherContainer.innerHTML = weather;
            $('#weatherIcon').attr('src', iconUrl);
        });
        
        
    });
}
else {
    console.log("Geolocalización no disponible en el navegador actual.");
}
