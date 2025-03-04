var productObj = {}
var productArr = []
var mainId;
document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    mainId = productId
    const arrayName = urlParams.get("array") || "products";

    console.log('Product ID:', productId, 'Array:', arrayName);

    if (!productId) {
        console.error("Product ID not found in URL");
        return;
    }

    const availableArrays = ["products", "newarrival", "multiproducts", "likeproduct"];
    productArr = arrayName
    let product = null;

    try {
        for (const arr of availableArrays) {
            const response = await fetch(`http://localhost:3000/${arr}/${productId}`);
            if (response.ok) {
                let json = await response.json();
                console.log(json);
                
                product = json
                productObj = json
                break;
            }
          
            
        }

        if (!product) throw new Error("Product not found in any array");

        document.getElementById("productImage").src = product.image;
        document.getElementById("productName").textContent = product.name;
        document.getElementById("productPrice").textContent = `$${product.price}`;
        document.getElementById("productOriginalPrice").textContent = `$${product.originalPrice}`;
        document.getElementById("productDiscount").textContent = product.discount;



          // ✅ Color Selection
          const colorContainer = document.getElementById("colorOptions");
          let lastSelectedColor = null;
  
          if (product.colors) {
              colorContainer.innerHTML = product.colors.map(color => `
                  <div class="color-dot" 
                       style="background-color: ${color.color}; border: 0.6px solid rgba(20, 20, 20, 0.2);" 
                       data-color="${color.color}">
                  </div>
              `).join("");
  
              document.querySelectorAll(".color-dot").forEach(dot => {
                dot.addEventListener("click", function () {
                    if (lastSelectedColor) {
                        lastSelectedColor.style.border = "0.6px solid rgba(20, 20, 20, 0.2)";
                    }
                    this.style.border = "2px solid black";
                    lastSelectedColor = this;
                    localStorage.setItem("selectedSingleColor", this.dataset.color);
                });

                if (localStorage.getItem("selectedSingleColor") === dot.dataset.color) {
                    dot.style.border = "2px solid black";
                    lastSelectedColor = dot;
                }
            });
        }
              // ✅ Wishlist Feature
              manageWishlist(product);

              // ✅ Cart Feature
              manageCart(product);
      
          } catch (error) {
              console.error("Error fetching product details:", error.message);
          }





            // Render vertical slider images dynamically
        const verticalSliderContainer = document.getElementById("sliderContainer");
        if (product.sliderImage && product.sliderImage.length > 0) {
            verticalSliderContainer.innerHTML = product.sliderImage.map((imageObj, index) => `
                <div class="slide-item">
                    <div class="slide-content">
                        <img src="${imageObj.image}" alt="Product Image" class="vertical-slider-img" data-index="${index}">
                    </div>
                </div>
            `).join("");

            // Add click event to change main image
            document.querySelectorAll(".vertical-slider-img").forEach(img => {
                img.addEventListener("click", function () {
                    document.getElementById("productImage").src = this.src;
                });
            });

            // Initialize vertical slider
            initializeVerticalSlider();
        } else {
            verticalSliderContainer.innerHTML = "<p>No additional images available.</p>";
        }

        // Render horizontal slider images dynamically
        const horizontalSliderContainer = document.querySelector(".slider-wrapper1");
        if (product.sliderImage && product.sliderImage.length > 0) {
            horizontalSliderContainer.innerHTML = product.sliderImage.map((imageObj, index) => `
                <div class="slide-item1">
                    <div class="slide-content1">
                        <img src="${imageObj.image}" alt="Product Image" class="small-slider-img" data-index="${index}">
                    </div>
                </div>
            `).join("");

            // Add click event to change main image
            document.querySelectorAll(".small-slider-img").forEach(img => {
                img.addEventListener("click", function () {
                    document.getElementById("productImage").src = this.src;
                });
            });

            // Initialize horizontal slider
            initializeSlider(".slider-wrapper1", ".prev1", ".next1");
        } else {
            horizontalSliderContainer.innerHTML = "<p>No additional images available.</p>";
        }
});




document.addEventListener("DOMContentLoaded", async () => {
    const wishlistContainer = document.getElementById("wishlist-button-container");

    // Set innerHTML with the wishlist buttons
    wishlistContainer.innerHTML = `
        <button class="icon-btn" id="wishlist-add">
            <i class="fa-regular fa-heart"></i>
        </button>
        <button class="icon-btn d-none" id="wishlist-remove">
            <i class="fa-solid fa-heart" style="color: #ff0000;"></i>
        </button>
    `;

    // Get the wishlist buttons
    const addWishlistBtn = document.getElementById("wishlist-add");
    const removeWishlistBtn = document.getElementById("wishlist-remove");

    // Get productId from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const arrayName = urlParams.get("array") || "products"; // Default array

    if (!productId) {
        console.error("Product ID not found in URL");
        return;
    }

    // Get userId from localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
    }

    try {
        // Fetch product data
        let response = await fetch(`http://localhost:3000/${arrayName}/${productId}`);

        if (!response.ok) {
            console.warn(`Product not found in ${arrayName}, searching in alternative array.`);
            const alternativeArray = arrayName === "products" ? "newarrival" : "products";
            response = await fetch(`http://localhost:3000/${alternativeArray}/${productId}`);

            if (!response.ok) throw new Error("Product not found in both arrays.");
        }

        const product = await response.json();

        // Fetch the user data
        let userResponse = await fetch(`http://localhost:3000/User/${userId}`);
        if (!userResponse.ok) throw new Error("User not found.");

        let userData = await userResponse.json();

        // Check if the product is already in the user's wishlist
        let wishlistItem = userData.wishlist.find(item => item.id === product.id);

        // Update heart icon based on wishlist status
        if (wishlistItem) {
            addWishlistBtn.classList.add("d-none");
            removeWishlistBtn.classList.remove("d-none");
        } else {
            removeWishlistBtn.classList.add("d-none");
            addWishlistBtn.classList.remove("d-none");
        }

        // Add product to wishlist
        addWishlistBtn.addEventListener("click", async () => {
            const wishlistEntry = {
                id: product.id,
                image: product.image,
                name: product.name,
                originalPrice: product.originalPrice,
                currentPrice: product.price,
                discount: product.discount,
                colors: product.colors ? product.colors.map(color => color.color) : [],
                moreColors: product.moreColors || 0,
                selectedColor: null,
                badge: product.tags ? true : false
            };

            // Update user's wishlist
            userData.wishlist.push(wishlistEntry);

            let updateResponse = await fetch(`http://localhost:3000/User/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ wishlist: userData.wishlist })
            });

            if (updateResponse.ok) {
                addWishlistBtn.classList.add("d-none");
                removeWishlistBtn.classList.remove("d-none");
                console.log("Added to wishlist");
            } else {
                console.error("Failed to update wishlist");
            }
        });

        // Remove product from wishlist
        removeWishlistBtn.addEventListener("click", async () => {
            userData.wishlist = userData.wishlist.filter(item => item.id !== product.id);

            let updateResponse = await fetch(`http://localhost:3000/User/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ wishlist: userData.wishlist })
            });

            if (updateResponse.ok) {
                removeWishlistBtn.classList.add("d-none");
                addWishlistBtn.classList.remove("d-none");
                console.log("Removed from wishlist");
            } else {
                console.error("Failed to update wishlist");
            }
        });

    } catch (error) {
        console.error("Error fetching product details:", error.message);
    }
});


document.addEventListener("DOMContentLoaded", async () => {
    const cartContainer = document.getElementById("cart-container");

    // Insert Quantity Selector & Add to Cart Button
    cartContainer.innerHTML = `
        <div class="quantity-container">
            <button class="quantity-btn" id="decrease-qty">-</button>
            <input type="text" class="quantity-input" id="quantity-input" value="1">
            <button class="quantity-btn" id="increase-qty">+</button>
        </div>
        <button class="add-to-cart1" id="add-to-cart">Add to cart</button>
    `;

    // Get Elements
    const decreaseBtn = document.getElementById("decrease-qty");
    const increaseBtn = document.getElementById("increase-qty");
    const quantityInput = document.getElementById("quantity-input");
    const addToCartBtn = document.getElementById("add-to-cart");

    // Get Product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const arrayName = urlParams.get("array") || "products";

    if (!productId) {
        console.error("Product ID not found in URL");
        return;
    }

    // Get User ID from localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.error("User ID not found in localStorage");
        return;
    }

    // Fetch product details from JSON server
    async function fetchProduct(productId) {
        try {
            const response = await fetch(`http://localhost:3000/${arrayName}/${productId}`);
            if (!response.ok) throw new Error("Failed to fetch product data");
            return await response.json();
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }

    // Fetch user data from JSON server
    async function fetchUser(userId) {
        try {
            const response = await fetch(`http://localhost:3000/User/${userId}`);
            if (!response.ok) throw new Error("Failed to fetch user data");
            return await response.json();
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    // Add or update cart item in the JSON server
    async function addToCart() {
        const product = await fetchProduct(productId);
        if (!product) {
            console.error("Product data not found");
            return;
        }

        const user = await fetchUser(userId);
        if (!user) {
            console.error("User data not found");
            return;
        }

        let orders = user.orders || [];
        const selectedColor = product.colors?.[0] || null; // Default to first available color if present
        const quantity = parseInt(quantityInput.value);

        // Check if product already exists in cart
        let existingItem = orders.find(item => item.id === productId);

        if (existingItem) {
            // Update existing item's quantity
            existingItem.quantity = quantity;
        } else {
            // Add new product to cart
            const newItem = {
                id: Date.now(),
                image: product.image,
                name: product.name,
                currentPrice: product.price,
                quantity: quantity,
                selectedColor: selectedColor,
            };
            orders.push(newItem);
        }

        // Update JSON server
        try {
            const updateResponse = await fetch(`http://localhost:3000/User/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orders }),
            });

            if (!updateResponse.ok) throw new Error("Failed to update cart");
            console.log("Cart updated successfully!");
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    }

    // Quantity Increase & Decrease Events
    increaseBtn.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    decreaseBtn.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    // Add to Cart Event
    addToCartBtn.addEventListener("click", addToCart);
});






// Function to initialize horizontal slider functionality
function initializeSlider(wrapperSelector, prevBtnSelector, nextBtnSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);

    if (!wrapper || !prevBtn || !nextBtn) return;

    let scrollAmount = 0;
    const slideWidth = 150;

    prevBtn.addEventListener("click", () => {
        wrapper.scrollBy({ left: -slideWidth, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        wrapper.scrollBy({ left: slideWidth, behavior: "smooth" });
    });
}

// Function to initialize vertical slider functionality
function initializeVerticalSlider() {
    const wrapper = document.querySelector("#sliderContainer");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    if (!wrapper || !prevBtn || !nextBtn) return;

    let scrollAmount = 0;
    const slideHeight = 120;

    prevBtn.addEventListener("click", () => {
        wrapper.scrollBy({ top: -slideHeight, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        wrapper.scrollBy({ top: slideHeight, behavior: "smooth" });
    });
}


// ***********  Review  ************
const userId = localStorage.getItem("userId")
var passwordObj = {}
async function usergetData () {
    const respose = await fetch(`http://localhost:3000/User/${userId}`)
    const json = await respose.json()
    passwordObj = json
    console.log("json" , json);
}
usergetData()

function handleReviewPopup() {
    var myModal = new bootstrap.Modal(document.getElementById('reviewModal'));
    myModal.show();

    document.getElementById("ds_reviewPopup_img").src = productObj?.image ? productObj?.image : `/IMG/Dhruvin/lipstick.png`
    document.getElementById("ds_reviewPopup_title").innerHTML = productObj?.name
}

document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".ds_review_star");
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener("click", function () {
            selectedRating = this.getAttribute("data-value");
            highlightStars(selectedRating);
        });

        star.addEventListener("mouseover", function () {
            highlightStars(this.getAttribute("data-value"));
        });

        star.addEventListener("mouseleave", function () {
            highlightStars(selectedRating);
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute("data-value") <= rating) {
                star.classList.add("text-warning"); // Add active class
            } else {
                star.classList.remove("text-warning");
            }
        });
    }
});




function previewFiles(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById("previewContainer");

    Array.from(files).forEach(file => {
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            if (file.type.startsWith("image")) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.classList.add("preview-img");
                img.style.width = "80px";
                img.style.height = "80px";
                img.style.marginRight = "5px";
                previewContainer.appendChild(img);
            } else if (file.type.startsWith("video")) {
                const video = document.createElement("video");
                video.controls = true;
                video.width = 100;
                video.height = 100;
                const source = document.createElement("source");
                source.src = e.target.result;
                source.type = file.type;
                video.appendChild(source);
                previewContainer.appendChild(video);
            }
        };
        fileReader.readAsDataURL(file);
    });
}


async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function uploadFiles(files) {
    let base64Files = [];
    for (const file of files) {
        if (file) {
            try {
                const base64String = await fileToBase64(file);
                base64Files.push(base64String);  // Directly push base64 string
            } catch (error) {
                console.error("Error converting file to Base64:", error);
            }
        }
    }
    console.log("jnojo" , base64Files);
    
    return base64Files;
}

async function handleSubmitReview() {
    const rating = document.querySelectorAll(".ds_review_star.text-warning").length;
    const title = document.querySelector("#ds_reviewPopup_input").value.trim();
    const reviewText = document.querySelector("#ds_reviewPopup_textarea").value.trim();
    const fileInput = document.querySelector("#ds_fileInput");
    const files = fileInput.files;

    if (rating === 0) {
        alert("Please select a rating.");
        return;
    }

    if (title.length < 5) {
        alert("Review title must be at least 5 characters long.");
        return;
    }

    if (reviewText.length < 20) {
        alert("Review text must be at least 20 characters long.");
        return;
    }

    let fileBase64Array = [];
    if (files.length > 0) {
        const validTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/webm"];
        for (const file of files) {
            if (!validTypes.includes(file.type)) {
                alert("Invalid file format. Please upload an image (JPEG, PNG, GIF) or a video (MP4, WEBM).");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert("File size must be less than 5MB.");
                return;
            }
        }
        fileBase64Array = await uploadFiles(files);
    }

    // Create an array of objects with the base64 data in the 'file' key
    const fileObjects = fileBase64Array.map(base64 => {
        return { file: base64 };
    });

    console.log("object" , fileObjects);
    
    // const newReview = {
    //     id: passwordObj?.id,
    //     name: passwordObj?.fullName,
    //     selectedImage: passwordObj?.selectedImage ? passwordObj?.selectedImage : "/IMG/Dhruvin/myPerson.png",
    //     rating,
    //     title,
    //     reviewText,
    //     files: fileObjects,  // Now using the 'file' key in each object
    //     date: new Date().toISOString().split("T")[0]
    // };

    // try {
    //     const response = await fetch(`http://localhost:3000/${productArr}/${mainId}`);
    //     if (!response.ok) throw new Error("Failed to fetch product data");

    //     let productData = await response.json();
    //     if (!productData.reviews) productData.reviews = [];
    //     productData.reviews.push(newReview);

    //     const updateResponse = await fetch(`http://localhost:3000/${productArr}/${mainId}`, {
    //         method: "PATCH",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ reviews: productData.reviews })
    //     });

    //     if (!updateResponse.ok) throw new Error("Failed to update product reviews");

    //     console.log("Review added successfully!", await updateResponse.json());
    //     alert("Review submitted successfully!");

    // } catch (error) {
    //     alert("Error: " + error.message);
    // }
}



