const wishlistData = [{
        id: 1,
        topRated: true,
        Image: "../../IMG/Parth/swiss_beauty.png",
        productName: "SWISS BEAUTY Cream it up blusher",
        Price: "$450",
        actualPrice: "$600",
        discount: "20% Off",
        color: ["rgba(232, 132, 130, 1)", "rgba(228, 136, 131, 1)", "rgba(226, 127, 124, 1)", "rgba(227, 126, 101, 1)"],
        moreColor: "1",
    },
    {
        id: 2,
        topRated: false,
        Image: "../../IMG/Parth/koric_protein.png",
        productName: "Koric Protein+ Superfood Cleansing Balm",
        Price: "$450",
        actualPrice: "$600",
        discount: "20% Off",
        color: [],
        moreColor: "",
    },
    {
        id: 3,
        topRated: true,
        Image: "../../IMG/Parth/MAC_glow_lip_balm.png",
        productName: "MAC Glow Play Tender Talk Lip Balm",
        Price: "$450",
        actualPrice: "$600",
        discount: "20% Off",
        color: ["rgba(255, 122, 166, 1)", "rgba(204, 185, 216, 1)", "rgba(236, 156, 83, 1)", "rgba(181, 41, 106, 1)"],
        moreColor: "10",
    },
    {
        id: 4,
        topRated: false,
        Image: "../../IMG/Parth/Cosmetic_body_shot.png",
        productName: "Eveline Cosmetics Body Shot Collagen Regeneration 200gm",
        Price: "$450",
        actualPrice: "$600",
        discount: "20% Off",
        color: [],
        moreColor: "",
    }
];

console.log('wishlistData', wishlistData);

const wishlistContainer = document.querySelector("#wishlistContainer");
const emptyWishlistSection = document.querySelector("section.d-none");

if (wishlistData.length === 0) {
    emptyWishlistSection.classList.remove("d-none"); // Show empty wishlist message
} else {
    emptyWishlistSection.classList.add("d-none"); // Hide empty wishlist message
}

const wishlistHTML = wishlistData.map((item) => {
    const colorsHTML = item.color.map((color) =>
        `<div class="V_color_border mx-1"><p class="V_color" style="background-color: ${color};"></p></div>`).join("");

    const moreColorHTML = item.moreColor ?
        `<div class="V_color_border mx-1"><p class="V_color V_more d-flex align-items-center justify-content-center">+${item.moreColor}</p></div>` : "";

    const topRatedHTML = item.topRated === true ?
        `<img src="../../IMG/Parth/top rated.png" alt="top rated" class="V_top_rated">` : "";

    return `
      
                <div class="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-5 mb-sm-4">
                    <div class="V_border">
                        <div class="position-relative">
                            <img src=${item.Image} alt="${item.productName}" class="V_image mx-auto">
                            ${topRatedHTML}
                            <div class="V_dil_border d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-heart " style="color: #ff0000;"></i>                                </div>
                            </div>
                            <div class="V_name_width mx-auto">
                                <p class="text text-center V_name">${item.productName}</p>
                                <div class="d-flex justify-content-center align-items-center">
                                    <p class="text V_price mx-2 mb-0">${item.Price}</p>
                                    <p class="text V_actual_price mb-0 mx-1">${item.actualPrice}</p>
                                    <p class="text V_green mb-0 mx-2">${item.discount}</p>
                                </div>
                                <div class="d-flex V_height justify-content-center mt-2">
                                    ${colorsHTML}
                                    ${moreColorHTML}
                                </div>
                                <div class="V_cart_btn my-4">
                                    <p class="text text-center mb-0 py-2">Move to Cart</p>
                                </div>
                            </div>
                        </div>
                    </div>
        
    `;
}).join("");

wishlistContainer.innerHTML = wishlistHTML;