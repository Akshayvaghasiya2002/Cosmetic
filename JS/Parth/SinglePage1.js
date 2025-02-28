







// document.addEventListener("DOMContentLoaded", async () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = urlParams.get("id");
//     const arrayName = urlParams.get("array") || "products"; // Default to 'products' if no array is provided

//     console.log('Product ID:', productId, 'Array:', arrayName);

//     if (!productId) {
//         console.error("Product ID not found in URL");
//         return;
//     }

//     try {
//         // Fetch product data from the correct array
//         let response = await fetch(`http://localhost:3000/${arrayName}/${productId}`);
        
//         // If not found, try the alternative array
//         if (!response.ok) {
//             console.warn(`Product not found in ${arrayName}, searching in alternative array.`);
//             const alternativeArray = arrayName === "products" ? "newarrival" : "products";
//             response = await fetch(`http://localhost:3000/${alternativeArray}/${productId}`);

//             if (!response.ok) throw new Error(`Product not found in both arrays.`);
//         }

//         const product = await response.json();
        
//         // Populate single product details
//         document.getElementById("productImage").src = product.image;
//         document.getElementById("productName").textContent = product.name;
//         document.getElementById("productPrice").textContent = `$${product.price}`;
//         document.getElementById("productOriginalPrice").textContent = `$${product.originalPrice}`;
//         document.getElementById("productDiscount").textContent = product.discount;

//         // Render color options dynamically
//         const colorContainer = document.getElementById("colorOptions");
//         if (product.colors) {
//             colorContainer.innerHTML = product.colors.map(color => `
//                 <div class="color-dot" style="background-color: ${color.color};"></div>
//             `).join("");
//         }

//         // Render slider images dynamically
//         const sliderContainer = document.getElementById("sliderContainer");

//         if (product.sliderImage && product.sliderImage.length > 0) {
//             sliderContainer.innerHTML = product.sliderImage.map(imageObj => `
//                 <div class="slide-item">
//                     <img src="${imageObj.image}" alt="Product Image">
//                 </div>
//             `).join("");

//             // Call function to initialize slider
//             initializeSlider();
//         } else {
//             sliderContainer.innerHTML = "<p>No additional images available.</p>";
//         }

//     } catch (error) {
//         console.error("Error fetching product details:", error.message);
//     }
// });






























// document.addEventListener("DOMContentLoaded", async () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = urlParams.get("id");
//     const arrayName = urlParams.get("array") || "products"; // Default to 'products' if no array is provided

//     console.log('Product ID:', productId, 'Array:', arrayName);

//     if (!productId) {
//         console.error("Product ID not found in URL");
//         return;
//     }

//     try {
//         // Fetch product data from the correct array
//         let response = await fetch(`http://localhost:3000/${arrayName}/${productId}`);

//         // If not found, try the alternative array
//         if (!response.ok) {
//             console.warn(`Product not found in ${arrayName}, searching in alternative array.`);
//             const alternativeArray = arrayName === "products" ? "newarrival" : "products";
//             response = await fetch(`http://localhost:3000/${alternativeArray}/${productId}`);

//             if (!response.ok) throw new Error(`Product not found in both arrays.`);
//         }

//         const product = await response.json();

//         // Populate single product details
//         const productImage = document.getElementById("productImage");
//         productImage.src = product.image; // Default main image

//         document.getElementById("productName").textContent = product.name;
//         document.getElementById("productPrice").textContent = `$${product.price}`;
//         document.getElementById("productOriginalPrice").textContent = `$${product.originalPrice}`;
//         document.getElementById("productDiscount").textContent = product.discount;

//         // Render color options dynamically
//         const colorContainer = document.getElementById("colorOptions");
//         if (product.colors) {
//             colorContainer.innerHTML = product.colors.map(color => `
//                 <div class="color-dot" style="background-color: ${color.color};"></div>
//             `).join("");
//         }

//         // Render slider images dynamically
//         const sliderContainer = document.getElementById("sliderContainer");

//         if (product.sliderImage && product.sliderImage.length > 0) {
//             sliderContainer.innerHTML = product.sliderImage.map(imageObj => `
//                 <div class="slide-item">
//                     <img src="${imageObj.image}" alt="Product Image" class="slider-img">
//                 </div>
//             `).join("");

//             // Attach event listener directly after DOM update
//             document.querySelectorAll(".slider-img").forEach(img => {
//                 img.addEventListener("click", function () {
//                     productImage.src = this.src; // Update main image
//                 });
//             });

//         } else {
//             sliderContainer.innerHTML = "<p>No additional images available.</p>";
//         }

//           // Render **second horizontal slider** images dynamically
//           const smallSliderContainer = document.querySelector(".slider-wrapper1");

//           if (product.sliderImage && product.sliderImage.length > 0) {
//               smallSliderContainer.innerHTML = product.sliderImage.map(imageObj => `
//                   <div class="slide-item1">
//                       <div class="slide-content1">
//                           <img src="${imageObj.image}" alt="Product Image" class="small-slider-img">
//                       </div>
//                   </div>
//               `).join("");
  
//               // Add click event to update main image
//               document.querySelectorAll(".small-slider-img").forEach(img => {
//                   img.addEventListener("click", function () {
//                       productImage.src = this.src;
//                   });
//               });
  
//           } else {
//               smallSliderContainer.innerHTML = "<p>No additional images available.</p>";
//           }

          
//     } catch (error) {
//         console.error("Error fetching product details:", error.message);
//     }
// });







document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const arrayName = urlParams.get("array") || "products"; // Default to 'products' if no array is provided

    console.log('Product ID:', productId, 'Array:', arrayName);

    if (!productId) {
        console.error("Product ID not found in URL");
        return;
    }

    try {
        // Fetch product data from the correct array
        let response = await fetch(`http://localhost:3000/${arrayName}/${productId}`);

        // If not found, try the alternative array
        if (!response.ok) {
            console.warn(`Product not found in ${arrayName}, searching in alternative array.`);
            const alternativeArray = arrayName === "products" ? "newarrival" : "products";
            response = await fetch(`http://localhost:3000/${alternativeArray}/${productId}`);

            if (!response.ok) throw new Error(`Product not found in both arrays.`);
        }

        const product = await response.json();

        // Populate single product details
        document.getElementById("productImage").src = product.image;

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

    } catch (error) {
        console.error("Error fetching product details:", error.message);
    }
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
