const menu = document.querySelector(".menu");
const menuInner = menu.querySelector(".menu-inner");
const menuArrow = menu.querySelector(".menu-arrow");
const burger = document.querySelector(".burger");
const overlay = document.querySelector(".overlay");

// Navbar Menu Toggle Function
function toggleMenu() {
   menu.classList.toggle("is-active");
   overlay.classList.toggle("is-active");
}

// Show Mobile Submenu Function
function showSubMenu(children) {
   subMenu = children.querySelector(".submenu");
   subMenu.classList.add("is-active");
   subMenu.style.animation = "slideLeft 0.35s ease forwards";
   const menuTitle = children.querySelector("i").parentNode.childNodes[0]
      .textContent;
   menu.querySelector(".menu-title").textContent = menuTitle;
   menu.querySelector(".menu-header").classList.add("is-active");
}

// Hide Mobile Submenu Function
function hideSubMenu() {
   subMenu.style.animation = "slideRight 0.35s ease forwards";
   setTimeout(() => {
      subMenu.classList.remove("is-active");
   }, 300);

   menu.querySelector(".menu-title").textContent = "";
   menu.querySelector(".menu-header").classList.remove("is-active");
}

// Toggle Mobile Submenu Function
function toggleSubMenu(e) {
   if (!menu.classList.contains("is-active")) {
      return;
   }
   if (e.target.closest(".menu-dropdown")) {
      const children = e.target.closest(".menu-dropdown");
      showSubMenu(children);
   }
}

// Fixed Navbar Menu on Window Resize
window.addEventListener("resize", () => {
   if (window.innerWidth >= 992) {
      if (menu.classList.contains("is-active")) {
         toggleMenu();
      }
   }
});

// Initialize All Event Listeners
burger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);
menuArrow.addEventListener("click", hideSubMenu);
menuInner.addEventListener("click", toggleSubMenu);

// *****************************   best seller js************************  //

const bestSellerData = async () => {
   try {
      const response = await fetch("http://localhost:3000/products");
      const products = await response.json();
      
      const container = document.getElementById("product-container");
      container.innerHTML = ""; // Clear previous content
      
      products.forEach(product => {
         const productElement = document.createElement("div");
         productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <img src="${product.image}" alt="${product.name}" width="100">
         `;
         container.appendChild(productElement);
      });
   } catch (error) {
      console.error("Error fetching products:", error.message);
   }
};

// Call the function when the page loads
window.onload = bestSellerData;
