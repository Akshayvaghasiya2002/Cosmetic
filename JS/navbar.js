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

// const bestSellerData = async () => {
//    try {
//       const response = await fetch("http://localhost:3000/products");
//       const products = await response.json();
      
//       const container = document.getElementById("product-container");
//       container.innerHTML = ""; // Clear previous content
      
//       products.forEach(product => {
//          const productElement = document.createElement("div");
//          productElement.innerHTML = `

//             <h3>${product.name}</h3>
//             <p>Price: $${product.price}</p>
//             <img src="${product.image}" alt="${product.name}" width="100">
//          `;
//          container.appendChild(productElement);
//       });
//    } catch (error) {
//       console.error("Error fetching products:", error.message);
//    }
// };

// // Call the function when the page loads
// window.onload = bestSellerData;


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
                                <div>
                                       <button style="" class="mt-2 w-100 A_addtocart_hover">Add To Cart</button>
                                </div>
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











        // search functionality
   

        function emptyNav() {

           const emptyNavbar = document.querySelector("nav");
           emptyNavbar.classList.toggle("d-none");

           const displaySearch =  document.querySelector(".V_search");
           displaySearch.classList.toggle('d-none');
         }
   

         const searchInput = document.querySelector(".V_input");
         const searchResult = document.querySelector(".V_result");
     
         // Function to toggle d-none class based on input value
         searchInput.addEventListener("input", function () {
             if (searchInput.value.trim() !== "" || searchInput.value.length > 0) {
                 searchResult.classList.remove("d-none"); // Show results
             } else {
                 searchResult.classList.add("d-none"); // Hide results
             }
         });
      