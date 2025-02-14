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

$(document).ready(async function () {
    try {
        const response = await fetch("http://localhost:3000/newarrival");
        const products = await response.json();
        console.log(products);

        const carousel = $("#product-carousel");
        carousel.empty();

        products.forEach(product => {
            const productElement = `
                     <div class="item A_newarrival_slider">
                         <div class="card h-100 text-center p-3">
                             <div class="d-flex justify-content-between align-items-center">
                                 <div>
                                     ${product.tags ? `<span class="badge">${product.tags}</span>` : ''}
                                 </div>
                                 <div class="ms-auto heart-container">
                                     <i class="fa-regular fa-heart"></i>
                                 </div>
                             </div>
                             <img src="${product.image}" class="card-img-top A_img_size mx-auto d-block" alt="${product.name}">
                             <div class="card-body">
                                 <h6 class="card-title text-truncate">${product.name}</h6>
                                 <div class="d-flex justify-content-between align-items-center flex-column">
                                     <p class="card-text mb-0">Price: $${product.price} <span style="text-decoration: line-through; color: #14141499; font-weight: 500;">$${product.originalPrice}</span></p>
                                     <p class="card-text" style="color:#388E3C">${product.discount}</p>
                                 </div>
                                 <button class="mt-2 w-100 A_addtocart_hover">Add To Cart</button>
                             </div>
                         </div>
                     </div>`;
            carousel.append(productElement);
        });

        // ////////////////////////////////// btn filter products //////////////////////////////////
        let allProducts = [];

        async function fetchProducts() {
            try {
                const response = await fetch("http://localhost:3000/products");
                if (!response.ok) throw new Error("Failed to fetch products");
                allProducts = await response.json();
                console.log("Products Loaded:", allProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        function filterProducts(category) {
            const productContainer = document.getElementById("product-container");
            productContainer.innerHTML = "";

            const filtered = allProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
            
            if (filtered.length === 0) {
                productContainer.innerHTML = `<p>No products found.</p>`;
                return;
            }

            filtered.forEach(product => {
                productContainer.innerHTML += `
                    <div>
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price}</p>
                        <p>Category: ${product.category}</p>
                    </div>
                    <hr>
                `;
            });
        }

        fetchProducts();
        // ////////////////////////////////// btn filter products //////////////////////////////////


        carousel.owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 5
                }
            }
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
    }
});





// search functionality

function emptyNav() {
    const emptyNavbar = document.querySelector("nav");
    emptyNavbar.classList.toggle("d-none");
    const displaySearch = document.querySelector(".V_search");
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


// password

function displayPwd() {

    const displayPassword = document.querySelector(".fa-eye-slash");
    displayPassword.classList.toggle("d-none");
    const hidePassword = document.querySelector(".fa-eye");
    hidePassword.classList.toggle('d-none');

    const fieldtype = document.getElementById("pwd");
    if (fieldtype.type === "password") {
        fieldtype.type = "text";
    } else {
        fieldtype.type = "password";
    }

}

function displayPwd1() {

    const displayNewPassword = document.getElementById("closeeye1");
    displayNewPassword.classList.toggle("d-none");
    const hideNewPassword = document.getElementById("openeye1");
    hideNewPassword.classList.toggle('d-none');
   
    const newPassword = document.getElementById("pwd1");
    if (newPassword.type === "password") {
        newPassword.type = "text";
    } else {
        newPassword.type = "password";
    }
    
}

function displayPwd2() {

    const displayConfirmPassword = document.getElementById("closeeye2");
    displayConfirmPassword.classList.toggle("d-none");
    const hideConfirmPassword = document.getElementById("openeye2");
    hideConfirmPassword.classList.toggle('d-none');
   
    const confirmPassword = document.getElementById("pwd2");
    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
    } else {
        confirmPassword.type = "password";
    }

}

function displayPwd3() {

    const displayConfirmPassword = document.getElementById("closeeye3");
    displayConfirmPassword.classList.toggle("d-none");
    const hideConfirmPassword = document.getElementById("openeye3");
    hideConfirmPassword.classList.toggle('d-none');
   
    const confirmPassword = document.getElementById("pwd3");
    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
    } else {
        confirmPassword.type = "password";
    }

}

function displayLogin() {
    const displayLogin = document.querySelector(".V_login_section");
    displayLogin.classList.toggle("d-none");
    const displaySignUp = document.querySelector(".V_sign_section");
    displaySignUp.classList.toggle('d-none');
}

function verifyEmail() {
    const hideResister = document.querySelector('.V_sign_section');
    hideResister.classList.add('d-none');
    const displaySignUp = document.querySelector(".V_520");
    displaySignUp.classList.remove('d-none');
    const displayEmail = document.querySelector(".V_verify_email_section");
    displayEmail.classList.remove("d-none");
    const displayOtp = document.querySelector(".V_verify_section");
    displayOtp.classList.add('d-none');
    const displayResetPwd = document.querySelector(".V_reset_section");
    displayResetPwd.classList.add('d-none');
    const hideforPwd = document.querySelector(".V_Forgot_section");
    hideforPwd.classList.add("d-none");
}

function displayForgetPwd() {
    const displayLogin = document.querySelector(".V_login_section");
    displayLogin.classList.add("d-none");
    const displaySignUp = document.querySelector(".V_520");
    displaySignUp.classList.remove('d-none');
    const displayOtp = document.querySelector(".V_verify_section");
    displayOtp.classList.add('d-none');
    const displayResetPwd = document.querySelector(".V_reset_section");
    displayResetPwd.classList.add('d-none');
    const displayEmail = document.querySelector(".V_verify_email_section");
    displayEmail.classList.add("d-none");
}

function loginClose() {
    const displayLogin = document.querySelector(".V_login_section");
    displayLogin.classList.add("d-none");
    const displaySignUp = document.querySelector(".V_sign_section");
    displaySignUp.classList.remove('d-none');
}

function asItIs() {
    const displaySignUp = document.querySelector(".V_sign_section");
    displaySignUp.classList.remove("d-none");
    const displayLogin = document.querySelector(".V_520");
    displayLogin.classList.add('d-none');
    const hideforPwd = document.querySelector(".V_Forgot_section");
    hideforPwd.classList.remove("d-none");
}

function verifyOtp() {
    const hideforPwd = document.querySelector(".V_Forgot_section");
    hideforPwd.classList.add("d-none");
    const displayOtp = document.querySelector(".V_verify_section");
    displayOtp.classList.remove('d-none');
}

function resetPassword() {
    const hideforPwd = document.querySelector(".V_Forgot_section");
    hideforPwd.classList.add("d-none");
    const hideOtp = document.querySelector(".V_verify_section");
    hideOtp.classList.add('d-none');
    const displayResetPwd = document.querySelector(".V_reset_section");
    displayResetPwd.classList.remove('d-none');
}



const otpFields = document.querySelectorAll('.V_otp_6');

otpFields.forEach((field, index) => {
    field.addEventListener('input', (e) => {
        let value = e.target.value;
        
        // Ensure only a single digit is entered
        e.target.value = value.replace(/\D/g, '').slice(0, 1);

        // Move to next field if a digit is entered
        if (e.target.value && index < otpFields.length - 1) {
            otpFields[index + 1].focus();
        }
    });

    field.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !field.value && index > 0) {
            otpFields[index - 1].focus();
        }
    });
});
