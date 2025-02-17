

const wishlistData = [
    {
        id: 1,
        topRated: "/IMG/Parth/25_off.png",
        Image: "../../IMG/Parth/offer_1.png",
        productName: "Eveline Cosmetics Wonder Match Creamy Liquid Matte Lipstick",
        Price: "$450",
        actualPrice: "$600",
        discount: "20% Off",
        color: ["#C67C7D", "#830021", "#9F2D56", "#DC5485"],
        moreColor: "4",
    },
    {
        id: 2,
        topRated: "/IMG/Parth/10_off.png",
        Image: "../../IMG/Parth/offer_2.png",
        productName: "MAC Glow Play Tender Talk Lip Balm",
        Price: "$450",
        actualPrice: "$600",
        discount: "20% Off",
        color: ["rgba(232, 132, 130, 1)", "rgba(228, 136, 131, 1)", "rgba(226, 127, 124, 1)", "rgba(227, 126, 101, 1)"],
        moreColor: "10",
    },
    {
        id: 3,
        topRated: "/IMG/Parth/15_off.png",
        Image: "../../IMG/Parth/offer_3.png",
        productName: "MAC MACXIMAL SLEEK SATIN LIPSTICK",
        Price: "$450",
        actualPrice: "$600",
        discount: "20% Off",
        color: ["#891D24", "#701F24", "#924B57", "#E9513E"],
        moreColor: "15",
    },
    {
        id: 4,
        topRated: "/IMG/Parth/20_off.png",
        Image: "../../IMG/Parth/offer_4.png",
        productName: "SUGAR Matte As Hell Mini Crayon Lipstick",
        Price: "$450",
        actualPrice: "$600",
        discount: "20% Off",
        color: ["#8C474C", "#861819", "#96547C", "#A84954"],
        moreColor: "2",
    }
];

console.log('wishlistData', wishlistData);

const OfferContainer = document.querySelector("#OfferContainer");

const wishlistHTML = wishlistData.map((item) => {
    // Generate colors HTML
    const colorsHTML = item.color.map((color) => 
        `<div class="V_color_border mx-1"><p class="V_color" style="background-color: ${color};"></p></div>`).join("");

    // Generate more colors HTML (if any)
    const moreColorHTML = item.moreColor ? 
        `<div class="V_color_border mx-1"><p class="V_color V_more d-flex align-items-center justify-content-center">+${item.moreColor}</p></div>` : "";

    // Check if `topRated` exists and is a valid path
    // const isTopRatedValid = item.topRated && item.topRated.trim() !== "";
    // const topRatedHTML = isTopRatedValid ? 
    //     `<img src="${item.topRated}" alt="Top Rated" class="V_top_rated w-auto">` :
     //   "";  // Optionally display nothing or a fallback image if invalid

    // Debugging log: check the `topRated` path being used
    console.log(`Top Rated Image for ${item.productName}: ${item.topRated}`);

    return `
        <div class="item">
            <div class="V_border mx-auto">
                <div class="position-relative">
                    <img src="${item.Image}" alt="${item.productName}" class="V_image mx-auto">
                    <img src="${item.topRated}" alt="Top Rated" class="V_top_rated w-auto">
                    <div class="V_dil_border d-flex align-items-center justify-content-center">
                        <i class="fa-regular fa-heart"></i>
                    </div>
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

// Insert the HTML content into OfferContainer
OfferContainer.innerHTML = wishlistHTML;

