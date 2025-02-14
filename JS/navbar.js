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
        console.log(products);

        const container = document.getElementById("product-container");
        container.innerHTML = ""; // Clear previous content

        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("col-lg-3", "mb-4");
            productElement.innerHTML = `
                        <div class="card h-100 text-center p-3">
                           <div class="d-flex justify-content-between align-items-center">
                              <div>
                                   ${product.tags ? `<span class="badge">${product.tags}</span>` : ''}
                              </div>
                              <div class="ms-auto heart-container">
                                    <i class="fa-regular fa-heart"></i>
                              </div>
                           </div>
                            <img src="${product.image}" class="card-img-top A_img_size mx-auto d-block" alt="${product.name}" >
                            <div class="card-body">
                                <h6 class="card-title">${product.name}</h6>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p class="card-text mb-0">
                                        Price: $${product.price} <span style="text-decoration: line-through; color: #14141499;   font-weight: 500; ">$${product.originalPrice}</span></p>
                                    <p class="card-text" style="color:#388E3C">${product.discount}</p>
                                </div>
                                
                                <div>
                                       <button style="" class="mt-2 w-100 A_addtocart_hover">Add To Cart</button>
                                </div>
                            
                            </div>
                        </div>
                    `;
            container.appendChild(productElement);
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
    }
};

window.onload = bestSellerData;
async function initCarousel() {
    try {
        const response = await fetch("http://localhost:3000/newarrival");
        const products = await response.json();
        console.log(products);

        const carousel = $("#product-carousel");

        // Destroy previous instance if exists (prevents duplication issues)
        carousel.trigger('destroy.owl.carousel').html('').removeClass('owl-loaded');

        // Append new product items
        products.forEach(product => {
            const productElement = `
                <div class="item A_newarrival_slider">
                    <div class="card h-100 text-center p-3 A_img_size2">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                ${product.tags ? `<span class="badge">${product.tags}</span>` : ''}
                            </div>
                            <div class="ms-auto heart-container">
                                <i class="fa-regular fa-heart"></i>
                            </div>
                        </div>
                        <img src="${product.image}" class="card-img-top mx-auto d-block" alt="${product.name}">
                        <div class="card-body">
                            <h6 class="card-title text-truncate">${product.name}</h6>
                            <div class="d-flex justify-content-between align-items-center flex-column">
                                <p class="card-text mb-0">Price: $${product.price} 
                                    <span style="text-decoration: line-through; color: #14141499; font-weight: 500;">
                                        $${product.originalPrice}
                                    </span>
                                </p>
                                <p class="card-text" style="color:#388E3C">${product.discount}</p>
                            </div>
                            <button class="mt-2 w-100 A_addtocart_hover">Add To Cart</button>
                        </div>
                    </div>
                </div>`;
            carousel.append(productElement);
        });

        // Reinitialize the Owl Carousel with proper responsive settings
        carousel.owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: {
                0: { items: 2 },     // Small screens
                600: { items: 2 },   // Medium screens
                1000: { items: 4 },  // Large screens
                1200: { items: 5 }   // Extra-large screens
            }
        });

    } catch (error) {
        console.error("Error fetching products:", error.message);
    }
}

// Run the function after the page is fully loaded
$(document).ready(function () {
    initCarousel();
});

