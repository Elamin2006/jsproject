let cartCotainer = document.querySelector(".products-in-cart");
let prodInCart = localStorage.getItem("choosen");
let items = prodInCart ? JSON.parse(prodInCart) : [];

drawProducts(items);

function drawProducts(arr) {
  if (!Array.isArray(arr)) arr = [arr];

  let y = arr.map((item) => {
    let count = item.count || 1;
    let totalPrice = item.totalprice || item.price;
    return `
    <div class="col-lg-4 mb-5 removed  " data-id="${item.id}" data-price="${item.price}">
  <div class="d-flex h-100 rounded-2 hover-div"> 
    <!-- Image Section -->
    <div class="w-25">
      <img src="${item.Image}" class="w-100 h-100 rounded-start" alt="">
    </div>

    <!-- Content Section -->
    <div class="w-75 p-2 carb d-flex flex-column justify-content-between">
      <div>
        <h4 class="mb-1">${item.name}</h4>
        <p class="mb-1">${item.category}</p>
        <span class="prc d-block mb-2">Price: ${totalPrice} L.E</span>
      </div>

      <div class="mt-auto d-flex justify-content-between">
  <div class=" align-items-center mb-2">
    <i class="fas fa-plus plus-btn btn btn-outline-dark p-1"></i>
    <span class="in-cart d-inline-block mx-2">${count}</span>
    <i class="fas fa-minus minus-btn btn btn-outline-dark p-1"></i>
  </div>
  <div class="text-start">
    <button class="btn btn-danger btn-sm remove-btn" onClick="removeFromCart(${item.id})">
      remove
    </button>
  </div>
</div>

    </div>
  </div>
</div>

    `;
  }).join("");
  cartCotainer.innerHTML = y;

  let productDivs = cartCotainer.querySelectorAll(".removed");
  productDivs.forEach((div) => {
    let plusBtn = div.querySelector(".plus-btn");
    let minusBtn = div.querySelector(".minus-btn");
    let countSpan = div.querySelector(".in-cart");
    let prcSpan = div.querySelector(".prc");

    let id = parseInt(div.getAttribute("data-id"));
    let basePrice = Number(div.getAttribute("data-price"));
    let currentItem = items.find((p) => p.id === id);

    let count = currentItem.count || 1;
    let totalPrice = currentItem.totalprice || basePrice;

    plusBtn.addEventListener("click", () => {
      count++;
      totalPrice += basePrice;
      countSpan.innerText = count;
      prcSpan.innerText = `Price: ${totalPrice} L.E`;
      updateCartItem(id, count, totalPrice);
    });

    minusBtn.addEventListener("click", () => {
      if (count > 1) {
        count--;
        totalPrice -= basePrice;
        countSpan.innerText = count;
        prcSpan.innerText = `Price: ${totalPrice} L.E`;
        updateCartItem(id, count, totalPrice);
      }else {
  // remove from DOM
  div.remove();
  // remove from localStorage
  removeFromCart(id);
}
    });
  });

  updateTotalPriceDisplay();
}

function updateCartItem(id, count, totalprice) {
  items = items.map((item) => {
    if (item.id === id) {
      return { ...item, count, totalprice };
    }
    return item;
  });
  localStorage.setItem("choosen", JSON.stringify(items));

  updateTotalPriceDisplay();
}

function removeFromCart(id) {
  items = items.filter((p) => String(p.id) !== String(id));
  localStorage.setItem("choosen", JSON.stringify(items));
  const toRemove = cartCotainer.querySelector(`.removed[data-id="${id}"]`);
  if (toRemove) {
    toRemove.remove();
  }
  updateTotalPriceDisplay();
}

function updateTotalPriceDisplay() {
  let total = items.reduce((sum, item) => sum + (item.totalprice || item.price), 0);
  let totalEl = document.querySelector(".total-price");
  if (totalEl) {
    totalEl.innerHTML = `<p class="text-center"> Total: ${total} SDG</p>`;
  }
}

// //////////////////////////////////// favorit /////////////////////////////////////////////////////

let favContainer = document.querySelector(".fav-container");

// get favorites from localStorage
let favorit = localStorage.getItem("favorit");

// if we have favorites, render them
if (favorit) {
  let favProd = JSON.parse(favorit);
  drawFavProducts(favProd);
} else {
  favContainer.innerHTML = `<p class="text-center text-muted">No favorites yet</p>`;
}

// draw favorites function
function drawFavProducts(products) {
  let y = products.map((item) => {
    return `
      <div class="vh-75 col-lg-4 mb-5">
        <div class="card w-100 h-100 d-flex flex-column align-content-center">
          <img class="card-img-top h-70" src="${item.Image}" alt="${item.name}">
          <div class="card-body text-center">
            <h4 class="card-title">${item.name}</h4>
            <p class="card-text">${item.category}</p>
            <div>
              <i class="fas fa-heart fav-icon text-success fa-2x" onClick="removeFromFav(${item.id})"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  favContainer.innerHTML = y;
}

// remove from favorites (inline onclick will call this)
function removeFromFav(id) {
  let favProd = JSON.parse(localStorage.getItem("favorit") || "[]");
  favProd = favProd.filter(p => p.id !== id);
  localStorage.setItem("favorit", JSON.stringify(favProd));
  drawFavProducts(favProd);
}
