let reGesteration = document.querySelector("#regstaration");
let cartLinks = document.querySelector(".cart-links");
let userName = document.querySelector(".user-name");
let cartDiv = document.querySelector(".cart-div");
let carProdtDiv = document.querySelector(".cart-div div");
let padge = document.querySelector(".padge");
let fName = document.querySelector("#fName");

let logOut = document.querySelector(".log-out");
let email = document.querySelector("#email");


if (localStorage.getItem("fName")){
    reGesteration.remove();
    cartLinks.classList.remove("d-none");
    cartLinks.style.display ="flex"
    userName.innerHTML = "hello, " + localStorage.getItem("fName")
}

logOut.addEventListener("click", () =>{
    localStorage.clear()
    setTimeout( () => {
        window.location = "index.html"
    } ,1500)
})



let product = document.querySelector(".products")


let allProducts = [
    {
        id:1,
        name: "Samsung A50",
        category: "Mobile Phone",
        price: 100 ,
        Image:"Images/A50.jpg",
    },
    {
        id:2,
        name: "iPhone 14 Pro Max",
        category: "Mobile Phone",
        price: 150,
        Image: "Images/iphone-14pro.jpg" ,
    },
    {
        id:3,
        name: "iPhone 15",
        category: "Mobile Phone",
        price: 200 ,
        Image: "Images/iphone-15.jpg",
    },
    {
        id:4,
        name: "Samsung S22 Ultra",
        category: "category1",
        price: 10,
        Image:"Images/s22.jpg",
    },
    {
        id:5,
        name: "iPhone 12",
        category: "Mobile Phone",
        price: 100 ,
        Image: "Images/iphone12.jpg",
    },
    {
        id:6,
        name: "Hp Core I 5",
        category: "Labtop",
        price: 70,
        Image: "Images/hp-lap.jpeg",
    },
    {
        id:7,
        name: "Ibad",
        category: "tablet",
        price: 100 ,
        Image: "Images/ibad.jpg",
    },
    {
        id:8,
        name: "Samsung Tab 5",
        category: "Tablet",
        price: 200 ,
        Image: "Images/tablet.jpg",
    },
    {
        id:9,
        name: "Samsung Smartwatch",
        category: "Smartwatch",
        price: 110,

        Image: "Images/smartwatch.jpg",
    },
    {
        id:10,
        name: "Apple Smartwatch",
        category: "Smartwatch",
        price: 150,
        
        Image: "Images/smartwatch-screen-digital-device.jpg",
    },
    {
        id:11,
        name: "airbodes",
        category: "Headphone",
        price: 100 ,
        Image: "Images/airbodes.png",
    },
     {
        id:11,
        name: "Headphone",
        category: "Headphone",
        price: 100 ,
        Image: "Images/still-life-wireless-cyberpunk-headphones.jpg",
    },
     {
        id:11,
        name: "Smartwatch",
        category: "Smartwatch",
        price: 100 ,
        Image: "Images/still-life-tech-device.jpg",
    },
]

function drawProducts(produtsarr = allProducts ){
    let y = produtsarr.map((item) => {
        return `
            <div class="vh-75 col-lg-4 mb-5 ">
<div class="card w-100 h-100 d-flex flex-column align-content-center hover-div rounded-2">
  <img class="card-img-top h-70" src="${item.Image}" alt="Card image">
  <div class="card-body text-center py-2 carb">
    <h4 class="card-title mb-2">${item.name}</h4>
    <p class="card-text mb-2">${item.category}</p>
    <span class="mb-2 d-inline-block">price : ${item.price} SDG</span>
    <div>
              <i class="fas fa-heart fav-icon fa-2x d-inline align-middle icn px-1" onClick="addtoFav(${item.id}, this)"></i>

    <button class="btn bton action_btn addBtn" onClick= "AddtoCart(${item.id}, this)">Add to Cart</button>
    </div>
  </div>
</div> 
            </div> 
            `
    }).join("")
    product.innerHTML = y
}
drawProducts()

let addBtn = document.querySelector(".addBtn");
let choosenProducts = localStorage.getItem("choosen")
  ? JSON.parse(localStorage.getItem("choosen"))
  : [];


// helper to create product div with pmDiv and events
function createCartProduct(product) {

  let productDiv = document.createElement("div");
  productDiv.classList.add("w-100", "cartbc", "p-3", "rounded-3", "text-center" , "mb-2");

  let count = product.count || 1;
  let basePrice = product.price;
  let totalprice = product.totalprice || basePrice;

  productDiv.innerHTML = `
   <div class=" row w-100 d-flex justify-content-between"> 
      <p class="prod-name">${product.name}</p>
      <p class="prod-price text-center flex-grow-1">Price: <br> ${totalprice} L.E</p>
   </div>
      <div class="pmDiv d-flex align-items-center me-auto">
        <i class="fas fa-plus plusicn btn btn-outline-dark"></i>
        <span class="in-cart p-2 ">${count}</span>
        <i class="fas fa-minus minusicn btn btn-outline-dark"></i>
      </div>
  `;

  let pmSpan = productDiv.querySelector(".in-cart");
  let plusBtn = productDiv.querySelector(".plusicn");
  let minusBtn = productDiv.querySelector(".minusicn");
  let prcSpan = productDiv.querySelector(".prod-price");

  plusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    count++;
    totalprice += basePrice;
    prcSpan.innerText = `Price: ${totalprice} L.E`;
    pmSpan.innerText = count;
    updateCartItem(product.id, count, totalprice);
  });

  minusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (count > 1) {
      count--;
      totalprice -= basePrice;
      prcSpan.innerText = `Price: ${totalprice} L.E`;
      pmSpan.innerText = count;
      updateCartItem(product.id, count, totalprice);
    }else {
  // remove from DOM
  productDiv.remove();
  // remove from localStorage
  removeFromCart(product.id);
}
  });

  return productDiv;
}
function removeFromCart(id) {
  choosenProducts = choosenProducts.filter((item) => item.id !== id);
  localStorage.setItem("choosen", JSON.stringify(choosenProducts));
  
  // update badge
  let cartProductsLength = carProdtDiv.querySelectorAll(".pmDiv").length;
  if (cartProductsLength === 0) {
    padge.classList.add("d-none");
  } else {
    padge.innerText = cartProductsLength;
  }
}

function updateCartItem(id, count, totalprice) {
  let choosen = JSON.parse(localStorage.getItem("choosen")) || [];
  choosen = choosen.map((item) => {
    if (item.id === id) {
      return { ...item, count, totalprice };
    }
    return item;
  });
  localStorage.setItem("choosen", JSON.stringify(choosen));
}
// restore products from localStorage
if (choosenProducts.length > 0) {
  choosenProducts.forEach((item) => {
    let productDiv = createCartProduct(item);
    carProdtDiv.appendChild(productDiv);
  });
  padge.classList.remove("d-none");
  padge.style.display = "block";
  padge.innerText = choosenProducts.length;
}

  function AddtoCart(id, addBtn) {
    if(!localStorage.getItem("fName")){
      window.location= "signup.html"
    }
    let foundProd = allProducts.find((item) => item.id === id);

    let productDiv = createCartProduct(foundProd);
    carProdtDiv.appendChild(productDiv);

    choosenProducts = [...choosenProducts, { ...foundProd, count: 1, totalprice: foundProd.price }];
    localStorage.setItem("choosen", JSON.stringify(choosenProducts));

    let cartProductsLength = carProdtDiv.querySelectorAll(".pmDiv").length;
    padge.classList.remove("d-none");
    padge.style.display = "block";
    padge.innerText = cartProductsLength;
let hovDv = document.querySelector(".hover-div");
  if (hovDv) {
    hovDv.style.transform = "translateY(0)";
  }

    addBtn.style.backgroundColor = "#FF3B30";
    addBtn.innerText = "remove from cart";
  }

let cartIcon = document.querySelector(".cart-icon-li")
cartIcon.addEventListener("click", openCart);

function openCart() {
  if (carProdtDiv.innerHTML.trim() !== "") {   
    cartDiv.classList.toggle("d-none");    
    // show/hide with Bootstrap class
  }
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////

let searchInput = document.querySelector(".search");
let select = document.querySelector("select");

searchInput.addEventListener("input", () => {
  let searchValue = searchInput.value.trim().toLowerCase();
  let selectOption = select.options[select.selectedIndex].id; // use id
  let searchResults = [];

  if (searchValue !== "") {
    if (selectOption === "category-opn") {
      searchResults = allProducts.filter((item) =>
        item.category.toLowerCase().indexOf(searchValue) !== -1
      );
    } else if (selectOption === "name-opn") {
      searchResults = allProducts.filter((item) =>
        item.name.toLowerCase().indexOf(searchValue) !== -1
      );
    } else {
      searchResults = allProducts;
    }
  } else {
    searchResults = allProducts; 
  }

  drawProducts(searchResults);
});

/////////////////////////////// favorit ////////////////////////////////////


// favorites store
let favProd = localStorage.getItem("favorit")
  ? JSON.parse(localStorage.getItem("favorit"))
  : [];


window.addtoFav = function(id, el) {
  
  if (!localStorage.getItem("fName")) {
    window.location = "login.html";
    return;
  }

  const fav = JSON.parse(localStorage.getItem("favorit") || "[]");
  if (!fav.some(p => p.id === id)) {
    const found = allProducts.find(p => p.id === id);
    if (found) {
      fav.push(found);
      localStorage.setItem("favorit", JSON.stringify(fav));
      if (el) el.style.color = "green";
    }
  }
};
