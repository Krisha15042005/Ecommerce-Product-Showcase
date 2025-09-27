// ======= Cart & Wishlist with localStorage =======
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cart-count").textContent = cart.length;
}

function addToCart(product) {
  cart.push(product);
  saveCart();
  alert(`${product.name} added to cart!`);
}

function addToWishlist(product) {
  wishlist.push(product);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert(`${product.name} added to wishlist!`);
}

function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";
  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

function toggleCart() {
  const modal = document.getElementById("cart-modal");
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    displayCart();
    modal.style.display = "block";
  }
}

// ======= Product Modal =======
const modal = document.getElementById("product-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const closeBtns = document.querySelectorAll(".close-btn");

document.querySelectorAll(".view-btn").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const card = btn.parentElement;
    modalImg.src = card.querySelector("img").src;
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalPrice.textContent = card.querySelector("p").textContent;
    modal.style.display = "block";
  });
});

closeBtns.forEach(btn => btn.addEventListener("click", () => {
  modal.style.display = "none";
}));

// ======= Dark / Light Mode =======
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

// ======= Category Filter =======
const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.getAttribute("data-category");

    products.forEach(product => {
      if (category === "all" || product.dataset.category === category) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});

// ======= Load saved theme & cart =======
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
  }
  saveCart();
});
