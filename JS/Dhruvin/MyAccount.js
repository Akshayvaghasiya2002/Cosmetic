document.getElementById("calendarIcon").addEventListener("click", function() {
    document.getElementById("datePicker").showPicker();
});


function handleManage(element) {
    
    const value = element.dataset.value;

    let offCanvas = document.getElementById("offcanvasRight");
    if (offCanvas && offCanvas.classList.contains("show")) {
        let offcanvasInstance = bootstrap.Offcanvas.getInstance(offCanvas);
        if (offcanvasInstance) {
            offcanvasInstance.hide();
        }
    }
    
    if (value === "6") {
        // Open the modal if the logout button is clicked
        const modalElement = document.getElementById("logOutModal");
        if (modalElement) {
            let modal = new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            console.error("Logout modal not found.");
        }
        return; // Stop further execution
    }

    // Other menu items handling
    const menuItems = document.querySelectorAll(".ds_func_manage, .ds_func_manage2, .ds_func_manage3, .ds_func_manage4, .ds_func_manage5, .ds_func_manage6");
    const sections = {
        1: document.getElementById("profileSection"),
        2: document.getElementById("orderSection"),
        3: document.getElementById("addressSection"),
        4: document.getElementById("passwordSection"),
        5: document.getElementById("deactivateSection"),
    };

    // Remove active class from all menu items
    menuItems.forEach(item => item.classList.remove("ds_active-border"));

    // Hide all sections
    Object.values(sections).forEach(section => {
        if (section) section.classList.add("d-none");
    });

    // Activate the selected menu item and show the corresponding section
    if (sections[value]) {
        // console.log("bgnrjkbgnrkbgoik " , sections[value]);
        element.classList.add("ds_active-border");
        sections[value].classList.remove("d-none");

        const sectionH4 = sections[value].querySelector("h4");
        if (sectionH4) {
            document.getElementById("ds_above_text").innerHTML = sectionH4.textContent.trim()
            // console.log("Section Title:", sectionH4.textContent.trim()); // Logs the text of the <h4>
        }
    }

   
}



// function handle (element) {
//    console.log("element",element);
// }

// function yes () {
//     let data = document.getElementById("kabali")
//     handle(data)
// }
// yes()
// *********** My Profile **********

// -------- Edit Image
let selectedImage = null; // Variable to store selected image

document.getElementById('cameraIcon').addEventListener('click', function() {
    document.getElementById('fileInput').click(); // Trigger file input
});document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get selected file
    
    if (file) {
        selectedImage = file; // Store in variable        // Preview the selected image
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('userImage').src = e.target.result;
            document.getElementById('ds_mini_img').src = e.target.result;
            document.getElementById('ds_offcan_img').src = e.target.result;

        };
        reader.readAsDataURL(file);
    }
});

// ----- Edit Profile 
function handleEditSubmit(event) {
    event.preventDefault();

    let firstName = document.getElementById("ds_edit_first").value.trim();
    let lastName = document.getElementById("ds_edit_last").value.trim();
    let mobile = document.getElementById("ds_edit_mobile").value.trim();
    let email = document.getElementById("ds_edit_email").value.trim();
    let dob = document.getElementById("datePicker").value.trim();
    let femaleChecked = document.getElementById("female").checked;
    let maleChecked = document.getElementById("male").checked;

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobilePattern = /^\d{10}$/; // Assumes a 10-digit mobile number

    if (firstName === "") {
        alert("First Name is required");
        return;
    }
    if (lastName === "") {
        alert("Last Name is required");
        return;
    }
    if (!mobilePattern.test(mobile)) {
        alert("Enter a valid 10-digit Mobile Number");
        return;
    }
    if (!emailPattern.test(email)) {
        alert("Enter a valid Email Address");
        return;
    }
    if (dob === "") {
        alert("Date of Birth is required");
        return;
    }
    if (!femaleChecked && !maleChecked) {
        alert("Please select a gender");
        return;
    }

    alert("Form submitted successfully!");
}

let userID = localStorage.getItem("userId")
let passwordObj = {}

function handleSelectFilter () {
    const select = document.getElementById('ds_order_select').value.trim()
    getUserProfileData(select)
}

function getUserProfileData(select = "all") {
    fetch("http://localhost:3000/User")
        .then((response) => response.json())
        .then((data) => {
            
            let user = data?.find((element) => element?.id == userID);             
            console.log(user);
            passwordObj = user      
            
            if (user) {
                document.getElementById("ds_edit_first").value = user?.fullName.split(" ")[0] || "";
                document.getElementById("ds_edit_last").value = user?.fullName.split(" ")[1] || "";
                document.getElementById("ds_edit_mobile").value = user?.phoneNumber || "";
                document.getElementById("ds_edit_email").value = user?.email || "";
                document.getElementById("datePicker").value = user?.dateOfBirth || "";
                document.getElementById("ds_mini_img").src = `${user?.selectedImage ? user?.selectedImage : '/IMG/Dhruvin/myPerson.png'}` ;
                document.getElementById("userImage").src = `${user?.selectedImage ? user?.selectedImage : '/IMG/Dhruvin/myPerson.png'}` ;
                document.getElementById("ds_offcan_img").src = `${user?.selectedImage ? user?.selectedImage : '/IMG/Dhruvin/myPerson.png'}` ;
                document.getElementById("ds_person_name").innerHTML = user?.fullName.split(" ")[0] || "";
                document.getElementById("ds_offcan_name").innerHTML = user?.fullName.split(" ")[0] || "";
                document.getElementById("ds_person_email").innerHTML = user?.email || "";
                document.getElementById("ds_offcan_email").innerHTML = user?.email || "";
                document.getElementById("ds_person_num").innerHTML = user?.phoneNumber || "";
                document.getElementById("ds_offcan_num").innerHTML = user?.phoneNumber || "";
                // Set gender correctly
                if (user?.gender == "Female") {
                    document.getElementById("female").checked = true;
                    selectGender("female"); 
                } else if (user?.gender == "Male") {
                    document.getElementById("male").checked = true;
                    selectGender("male");
                }


                const OrderId = document.getElementById("ds_Order")

                let FinalMap = [];
                if (select === "") {
                     FinalMap = user?.confirmedOrders || [];
                }
                else if (select == "all") {
                    FinalMap = user?.confirmedOrders
                }
                else {
                    FinalMap = user?.confirmedOrders?.filter((element) => element?.orderStatus == select) || [];
                }
                
                if(FinalMap?.length == 0) {
                    document.getElementById("ds_no_order").classList.remove("d-none")
                }
                else{
                    document.getElementById("ds_no_order").classList.add("d-none")
                }
                
                const html = FinalMap?.map((element)=>{
                      return `<div class="d-flex justify-content-between mt-4">
                                                    <div class="d-flex  justify-content-between w-100 align-items-center">
                                                        <div class="d-flex flex-wrap align-items-center">
                                                           <div class="${element?.orderStatus == 'pending' ? 'ds_order_round' : ''} ${element?.orderStatus == 'delivered' ? 'ds_order_round2' : ''} ${element?.orderStatus == 'cancelled' ? 'ds_order_round3' : ''} ${element?.orderStatus == 'return order' ? 'ds_order_round3' : ''} ds_order_round me-2"></div>
                                                               ${element?.orderStatus == 'pending' ? '<h5 class="mb-0 me-2 ds_order_text" style="color:#F8A120;">Order arriving</h5>' : ''}
                                                               ${element?.orderStatus == 'delivered' ? '<h5 class="mb-0 me-2 ds_order_color2 ds_order_text" >Order Delivered</h5>' : ''}
                                                               ${element?.orderStatus == 'cancelled' ? '<h5 class="mb-0 me-2 ds_order_color3 ds_order_text" >Order Cancelled</h5>' : ''}
                                                               ${element?.orderStatus == 'return order' ? '<h5 class="mb-0 me-2 ds_order_color3 ds_order_text" >Return Order</h5>' : ''}
                                                           <p class="mb-0 ds_muted align-self-end" style="font-size: 14px;">${element?.orderDate}</p>
                                                         </div>  
                                                               ${element?.orderStatus == 'pending' ? `<a href="/Dhruvin/OrderStatus(Processing).html" class="ds_color ds_order_anker ds_600" style="white-space: nowrap;" onclick="handleTrackOrder('${element?.batchId}')">Track Order</a>` : ''}
                                                               ${element?.orderStatus == 'delivered' ? `<button class="ds_color text-decoration-underline ds_600 ds_order_anker "  style="white-space: nowrap;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="handleTrackOrder('${element?.batchId}')"  >Submit Review</button>` : ''}
                                                               ${element?.orderStatus == 'cancelled' ? `<a href="./TrackRefund.html" class="ds_color ds_order_anker ds_600" style="white-space: nowrap;"  onclick="handleTrackOrder('${element?.batchId}')">View refund status</a>` : ''}
                                                               ${element?.orderStatus == 'return order' ? `<button class="ds_color text-decoration-underline ds_600 ds_order_anker "  style="white-space: nowrap;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="handleTrackOrder('${element?.batchId}')">Submit Review</button>` : ''}
                                                       </div>
                                                </div>
                                                ${element?.orders?.map((item)=>{
                                                    return  `<a href="${element?.orderStatus == 'delivered' ? '/Dhruvin/OrderStatus(Delivered).html' :'#'}" onclick="handleTrackOrder('${element?.batchId}')" class="row align-items-center text-decoration-none ${element?.orderStatus == 'delivered' ? 'ds_cursor' :'ds_cur_text'}" >
                                                                 <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 mt-3">
                                                                    <div>
                                                                      <img src="${item?.image}" alt="" class="ds_order_img">
                                                                    </div>
                                                                 </div>
                                                                 <div class="col-xl-10 col-lg-9 col-md-12 col-sm-8 mt-lg-4 mt-3">
                                                                    <div class="row justify-content-between">
                                                                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                                                                          <div>
                                                                              <div class="d-flex justify-content-between">
                                                                                  <p class="ds_color ds_lh ds_order_txt">${item?.brand ? item?.brand : ''} ${item?.name}</p>
                                                                              </div>
                                                                              <p class="ds_muted ds_order_txt">Shade : <span class="ds_color">${item?.selectedColor ?  item?.selectedColor : 'No Color'}</span></p>
                                                                              <div class="d-flex justify-content-between">
                                                                                  <p class="ds_muted ds_order_txt">Qty : <span class="ds_color">X1</span></p>
                                                                                  <h5 class="text-md-end ds_color">$ ${item?.currentPrice}</h5>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                        
                                                                    </div>
                                                                </div>
                                                         </a>
                                                           <div class="ds_border mt-3"></div>
                                                         `
                                                }).join(" ")
                                            } `
                        }).join("")

                        OrderId.innerHTML = html ? html : ""
            }
        })
        .catch((error) => console.error("Error fetching user data:", error));
}

// Call function to load user data into form
getUserProfileData();



function handleImageUpload(event) {
    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(e) {
        let imageUrl = e.target.result; // Base64 format
        document.getElementById("profileImage").src = imageUrl;

        // If uploading to a real server, you need to send the image via a fetch request
        uploadImageToServer(file).then(url => {
            if (url) {
                imageUrl = url; // Use the uploaded image URL
            }
        });
    };
    reader.readAsDataURL(file);
}

function handleUpdateProfile(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    let First = document.getElementById("ds_edit_first").value.trim();
    let Last = document.getElementById("ds_edit_last").value.trim();
    let Mobile = document.getElementById("ds_edit_mobile").value.trim();
    let Email = document.getElementById("ds_edit_email").value.trim();
    let Date = document.getElementById("datePicker").value.trim();

    // Determine selected gender
    let gender = document.getElementById("female").checked ? "Female" : 
                 document.getElementById("male").checked ? "Male" : "Male";

                 console.log(gender);
                 

    // Function to convert image to Base64
    // function convertImageToBase64(imageFile, callback) {
    //     const reader = new FileReader();
    //     reader.onloadend = function () {
    //         callback(reader.result); // Get Base64 string
    //     };
    //     reader.readAsDataURL(imageFile);
    // }

    // if (selectedImage) {
    //     convertImageToBase64(selectedImage, function (base64String) {
    //         let updatedUserData = {
    //             id:passwordObj?.id,
    //             fullName: `${First} ${Last}`,
    //             email: Email,
    //             password: passwordObj?.password,
    //             dateOfBirth: Date,
    //             gender: gender,
    //             phoneNumber: Mobile,
    //             selectedImage: base64String, // Store Base64 image string
    //             addresses: passwordObj?.addresses ? passwordObj?.addresses : [],
    //             carddetails: passwordObj?.carddetails ? passwordObj?.carddetails : [],
    //             confirmedOrders:passwordObj?.confirmedOrders ? passwordObj?.confirmedOrders : [],
    //             orders:passwordObj?.orders ? passwordObj?.orders : [],
    //             wishlist:passwordObj?.wishlist ? passwordObj?.wishlist : []
    //         };

            

    //         // Send JSON data to JSON Server
    //         fetch(`http://localhost:3000/User/${userID}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(updatedUserData)
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             alert("Profile updated successfully!");
    //             console.log("Updated User:", data);
    //         })
    //         .catch(error => console.error("Error updating profile:", error));
            
    //         getUserProfileData();
    //     });
    // } else {
    //     // If no new image is selected, update profile without changing image
    //     let updatedUserData = {
    //         id:passwordObj?.id,
    //         fullName: `${First} ${Last}`,
    //         email: Email,
    //         password: passwordObj?.password,
    //         dateOfBirth: Date,
    //         gender: gender,
    //         phoneNumber: Mobile,
    //         selectedImage: passwordObj?.selectedImage ? passwordObj?.selectedImage : null, 
    //         addresses: passwordObj?.addresses ? passwordObj?.addresses : [],
    //         carddetails: passwordObj?.carddetails ? passwordObj?.carddetails : [],
    //         confirmedOrders:passwordObj?.confirmedOrders ? passwordObj?.confirmedOrders : [],
    //         orders:passwordObj?.orders ? passwordObj?.orders : [],
    //         wishlist:passwordObj?.wishlist ? passwordObj?.wishlist : []
    //     };

    //     fetch(`http://localhost:3000/User/${userID}`, {
    //         method: "PUT",
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(updatedUserData)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         alert("Profile updated successfully!");
    //         console.log("Updated User:", data);
    //     })
    //     .catch(error => console.error("Error updating profile:", error));

    //     getUserProfileData();
    // }
}


// **************** My Order **********
function handleTrackOrder (id) {
    
   localStorage.setItem("MyBatchId" , id)
} 

////////// Submit Review ////////////
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

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

function previewFile(event) {
    const file = event.target.files[0];
    if (file) {
        const preview = document.getElementById('preview');
        if (file.type.startsWith('image')) {
            preview.src = URL.createObjectURL(file);
            uploadFile(file);
        } else if (file.type.startsWith('video')) {
            preview.outerHTML = `<video controls width="100%"><source src="${URL.createObjectURL(file)}" type="${file.type}"></video>`;
        }
    }
}

async function uploadFile(file) {
    if (!file) return null;
    try {
        const base64String = await fileToBase64(file);
        return base64String;
    } catch (error) {
        console.error("Error converting file to Base64:", error);
        return null;
    }
}

async function handleSubmitReview() {
    const rating = document.querySelectorAll(".ds_review_star.text-warning").length;
    const title = document.querySelector("#ds_review_title").value.trim();
    const reviewText = document.querySelector("#ds_review_textarea").value.trim();
    const fileInput = document.querySelector("#ds_fileInput");
    const file = fileInput.files[0];

    // Validation checks
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

    if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/webm"];
        if (!validTypes.includes(file.type)) {
            alert("Invalid file format. Please upload an image (JPEG, PNG, GIF) or a video (MP4, WEBM).");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert("File size must be less than 5MB.");
            return;
        }
    }

    const BatchId = localStorage.getItem("MyBatchId")
    // Convert file to Base64
    const fileBase64 = file ? await uploadFile(file) : null;


    const confirmedOrders = Array.isArray(passwordObj?.confirmedOrders)
    ? [...passwordObj.confirmedOrders] 
    : [];

// Find the order with the matching batchId
const orderIndex = confirmedOrders.findIndex(order => order?.batchId === BatchId);

if (orderIndex !== -1) {
    // Update the review for the found order
    confirmedOrders[orderIndex].review = {
        rating: rating,
        title: title,
        reviewText: reviewText,
        image: fileBase64 || null
    };
} 


    const userData = {
        id:passwordObj?.id,
        fullName:passwordObj?.fullName,
        email: passwordObj?.email,
        password: passwordObj?.password,
        dateOfBirth: passwordObj?.dateOfBirth || "",
        gender: passwordObj?.gender || "",
        phoneNumber: passwordObj?.phoneNumber,
        selectedImage: passwordObj?.selectedImage || "", // Store Base64 image string
        addresses: passwordObj?.addresses ? passwordObj?.addresses : [],
        carddetails: passwordObj?.carddetails ? passwordObj?.carddetails : [],
        confirmedOrders:confirmedOrders ? confirmedOrders : passwordObj?.confirmedOrders,
        orders:passwordObj?.orders ? passwordObj?.orders : [],
        wishlist:passwordObj?.wishlist ? passwordObj?.wishlist : []
    }

    fetch(`http://localhost:3000/User/${userID}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Review updated successfully!");
        console.log("Updated User:", data);
    })
    .catch(error => console.error("Error updating profile:", error));

    
}




// *********** My Address **********
var editId = "";

async function toggleDropdown(icon, id) {
    editId = id;
    console.log("sfwefgwefgwefgweg",editId);
    
    
    // Hide all other dropdowns
    document.querySelectorAll(".ds_add_dropdown").forEach(d => {
        d.classList.add("d-none");
    });

    // Select the dropdown related to the clicked icon
    let dropdown = icon.closest(".ds_pro_main").querySelector(".ds_add_dropdown");

    // Toggle the clicked dropdown
    if (dropdown) {
        dropdown.classList.toggle("d-none");
    }

    const response = await fetch(`http://localhost:3000/User/${userID}`,)
    const json = await response.json()
    const data = json?.addresses?.find((element)=> element.id == id)
    // console.log(data);

     document.getElementById("ds_add_edit_first").value = data?.firstName
     document.getElementById("ds_add_edit_last").value = data?.lastName
     document.getElementById("ds_add_edit_mobile").value = data?.mobileNumber
     document.getElementById("ds_add_edit_email").value = data?.email
     document.getElementById("ds_add_edit_zip").value = data?.zipCode
     document.getElementById("ds_add_edit_bilding").value = data?.address1
     document.getElementById("ds_add_edit_street").value = data?.address2
     document.getElementById("ds_add_edit_city").value = data?.city
     document.querySelector("select.ds_pro_input[name='ds_state']").value = data?.state || "";
     document.querySelector("select.ds_pro_input[name='ds_country']").value = data?.country || "";
     
    
}



// --- Gender Selection 
function selectGender(gender) {
    // Remove 'active' class from all gender options
    document.querySelectorAll('.gender-option').forEach(el => el.classList.remove('active'));

    // Get selected radio input
    let selectedInput = document.getElementById(gender);
    if (selectedInput) {
        selectedInput.checked = true;

        // Add 'active' class to the correct gender div
        let parentDiv = selectedInput.closest('.gender-option');
        if (parentDiv) {
            parentDiv.classList.add('active');
        }
    }


}



let selectedAddressType = 'Home';

function selectAddressType(button, type, event) {
        event.preventDefault();

        // Reset button states
        document.querySelectorAll('.ds_add_popup_btn, .ds_add_non_select').forEach(btn => {
            btn.classList.remove('ds_add_popup_btn');
            btn.classList.add('ds_add_non_select');
        });

        // Highlight the selected button
        button.classList.remove('ds_add_non_select');
        button.classList.add('ds_add_popup_btn');

        // Set selected address type
        selectedAddressType = type;

        // Show or hide input field based on the selected address type
        const inputContainer = document.getElementById('ds_address_type');
        if (type === 'Other') {
            inputContainer.style.display = 'block'; // Show input field for 'Other'
        } else {
            inputContainer.style.display = 'none'; // Hide input field for other types
        }
}

// ---- get address
const addressId = localStorage.getItem("selectedAddressId")

async function getAddressData () {
   const response = await fetch('http://localhost:3000/User')
   const json = await response.json()
   if(json){
       const address = json.find((element)=> element.id == userID)       
       console.log("addreess" ,address);

       const noAddress = address?.addresses
       if(noAddress?.length == 0 || noAddress == undefined){
          document.querySelector("#ds_no_address").classList.add("d-block")
          document.querySelector("#ds_no_address").classList.remove("d-none")
       }
       else{
         document.querySelector("#ds_no_address").classList.add("d-none")
         document.querySelector("#ds_no_address").classList.remove("d-block")
       }

       const noOrder = address.confirmedOrders
       if(noOrder?.length == 0 || noOrder == undefined){
          document.querySelector("#ds_no_order").classList.add("d-block")
          document.querySelector("#ds_no_order").classList.remove("d-none")
       }
       else{
          document.querySelector("#ds_no_order").classList.add("d-none")
          document.querySelector("#ds_no_order").classList.remove("d-block")
       }

   
    //    console.log(noAddress.length);
       

      const html = address?.addresses?.map((element)=>{
        
        
        return (
            `<div class="col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 mt-3">
            <div class=" ${element.id == addressId ? "ds_active_border" : "ds_pro_inner"} ds_pro_main p-4 position-relative address-card" 
                 id="address_${element?.id}">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="ds_add_type ds_color ds_600">${element?.addressType}</div>
                    <i class="fa-solid fa-ellipsis-vertical" onclick="toggleDropdown(this, ${element?.id})" style="cursor: pointer;"></i>
                </div>
                <div class="ds_border mt-3 mb-3"></div>
                <div id="ds_add_dropdown" class="ds_add_dropdown d-none">
                    <p data-bs-toggle="modal" data-bs-target="#editModal" style="cursor: pointer;">Edit</p>
                    <p class="mb-0" data-bs-toggle="modal" data-bs-target="#deleteModal" style="cursor: pointer;">Delete</p>
                </div>
                <div class="ds_cursor" onclick="handleSelectAddress(${element?.id})">
                    <h5 class="mb-3">${element?.firstName} ${element?.lastName}</h5>
                    <h6 class="mb-3">+1 ${element?.mobileNumber}</h6>
                    <p class="mb-0 ds_lh">${element?.address2} , ${element?.address1} , ${element?.city} , ${element?.state} , ${element?.country}</p>
                </div>
            </div>
          </div>`
        )
      }).join("")

     document.getElementById("ds_show_address").innerHTML = html ? html : ""
    
       
   }   
}
 getAddressData()

 function handleSelectAddress(id) {
    // Remove border from all address cards
    document.querySelectorAll(".address-card").forEach(card => {
        card.classList.remove("ds_active_border");
        card.classList.add("ds_pro_inner");
    });

    // Add border to the selected address
    const selectedCard = document.getElementById(`address_${id}`);
    if (selectedCard) {
        selectedCard.classList.add("ds_active_border");
        selectedCard.classList.remove("ds_pro_inner");
    }

    // Store selected address ID in localStorage
    localStorage.setItem("selectedAddressId", id);
}

// ------ add address popup

// const form = document.querySelector('#ds_add_new'); 
 
// form.addEventListener('submit', async function(event) { 
//   event.preventDefault(); 
//   // Your form submission logic here 

//   let firstName = document.getElementById("ds_add_first")?.value.trim();
//   let lastName = document.getElementById("ds_add_last")?.value.trim();
//   let mobile = document.getElementById("ds_add_mobile")?.value.trim();
//   let email = document.getElementById("ds_add_email")?.value.trim();
//   let zip = document.getElementById("ds_add_zip")?.value.trim();
//   let address = document.getElementById("ds_add_bilding")?.value.trim();
//   let address2 = document.getElementById("ds_add_street")?.value.trim();
//   let city = document.getElementById("ds_add_city")?.value.trim();
//   let state = document.querySelector("select.ds_pro_input[name='state']")?.value;
//   let country = document.querySelector("select.ds_pro_input[name='country']")?.value;
//   let otherAddress = document.getElementById("ds_address_type_input")?.value.trim();

//   let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   let mobilePattern = /^\d{10}$/;
//   let zipPattern = /^\d{5,}$/;


//   // Validation checks
//   if (!firstName || !lastName || !mobilePattern.test(mobile) || !emailPattern.test(email) ||
//       !zipPattern.test(zip) || !address || !city || !state || !country || !selectedAddressType) {
//       alert("Please fill all required fields correctly.");
//       return;
//   }

//   if (selectedAddressType === "Other" && !otherAddress) {
//       alert("Please enter an Address Type for 'Other'");
//       return;
//   }

//   // Collect the address data
//   const addressData = {
//       id: Date.now(), 
//       firstName: firstName,
//       lastName: lastName,
//       mobileNumber: mobile,
//       email: email,
//       zipCode: zip,
//       address1: address,
//       address2: address2 || "",
//       city: city,
//       state: state,
//       country: country,
//       addressType: selectedAddressType,
//       otherType: otherAddress || ""
//   };

//   // Send the address data to the backend
//   try {
//       // This should be dynamically fetched based on the logged-in user
//       const userResponse = await fetch(`http://localhost:3000/User/${userID}`);
//       const userData = await userResponse.json();

//       if (!userData.addresses) {
//           userData.addresses = []; // Initialize addresses array if not already present
//       }

//       // Add the new address to the user's addresses
//       userData.addresses.push(addressData);

//       // Update the user data in the database (db.json)
//       await fetch(`http://localhost:3000/User/${userID}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(userData)
//       });

//       alert("Address saved successfully!");

//       // Close the modal 
//       $('#addressModal').hide();
//       $('.modal-backdrop').remove(); // Remove the backdrop

//   } catch (error) {
//       console.error("Error while saving address: ", error);
//       alert("Failed to save address.");
//   }

//   getAddressData()
// }); 

async function handleAddress(event) {
    // event.stopPropagation();
    event.preventDefault();

    let firstName = document.getElementById("ds_add_first")?.value.trim();
    let lastName = document.getElementById("ds_add_last")?.value.trim();
    let mobile = document.getElementById("ds_add_mobile")?.value.trim();
    let email = document.getElementById("ds_add_email")?.value.trim();
    let zip = document.getElementById("ds_add_zip")?.value.trim();
    let address = document.getElementById("ds_add_bilding")?.value.trim();
    let address2 = document.getElementById("ds_add_street")?.value.trim();
    let city = document.getElementById("ds_add_city")?.value.trim();
    let state = document.querySelector("select[name='state']")?.value;
    let country = document.querySelector("select[name='country']")?.value;
    let otherAddress = document.getElementById("ds_address_type_input")?.value.trim();

    // Ensure the selected address type is captured
    let selectedAddressType = document.querySelector(".ds_add_popup_btn, .ds_add_non_select.active")?.innerText || "";
    
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobilePattern = /^\d{10}$/;
    let zipPattern = /^\d{5,}$/;


    // Validation checks
    if (!firstName || !lastName || !mobilePattern.test(mobile) || !emailPattern.test(email) ||
      !zipPattern.test(zip) || !address || !city || !state || !country || !selectedAddressType) {
      alert("Please fill all required fields correctly.");
      return;
    }

    if (selectedAddressType === "Other" && !otherAddress) {
      alert("Please enter an Address Type for 'Other'");
      return;
    }


    // Collect the address data
    const addressData = {
      id: Date.now(),
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobile,
      email: email,
      zipCode: zip,
      address1: address,
      address2: address2 || "",
      city: city,
      state: state,
      country: country,
      addressType: selectedAddressType,
      otherType: otherAddress || ""
    };

    try {
        // Fetch current user data
        const userResponse = await fetch(`http://localhost:3000/User/${userID}`);
        const userData = await userResponse.json();

      if (!userData.addresses) {
        userData.addresses = []; // Initialize addresses array if not already present
      }

        // Add new address
        userData.addresses.push(addressData);

        // Update user data in the backend
        await fetch(`http://localhost:3000/User/${userID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        $('#addressModal').modal('hide');

      alert("Address saved successfully!");

        // Close the modal properly

        // Refresh address list
        getAddressData();
    } catch (error) {
      console.error("Error while saving address: ", error);
      alert("Failed to save address.");
    }

    
}


// ------ Edit address popup
async function handleEditAddress(event) {
    event.preventDefault();
    // event.stopPropagation();

    let firstName = document.getElementById("ds_add_edit_first")?.value.trim();
    let lastName = document.getElementById("ds_add_edit_last")?.value.trim();
    let mobile = document.getElementById("ds_add_edit_mobile")?.value.trim();
    let email = document.getElementById("ds_add_edit_email")?.value.trim();
    let zip = document.getElementById("ds_add_edit_zip")?.value.trim();
    let address = document.getElementById("ds_add_edit_bilding")?.value.trim();
    let address2 = document.getElementById("ds_add_edit_street")?.value.trim();
    let city = document.getElementById("ds_add_edit_city")?.value.trim();
    let state = document.querySelector("select.ds_pro_input[name='ds_state']")?.value;
    let country = document.querySelector("select.ds_pro_input[name='ds_country']")?.value;

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobilePattern = /^\d{10}$/;
    let zipPattern = /^\d{5,}$/;

    if (!firstName) return alert("First Name is required");
    if (!lastName) return alert("Last Name is required");
    if (!mobilePattern.test(mobile)) return alert("Enter a valid 10-digit Mobile Number");
    if (!emailPattern.test(email)) return alert("Enter a valid Email Address");
    if (!zipPattern.test(zip)) return alert("Enter a valid ZIP / Postal Code (at least 5 digits)");
    if (!address) return alert("Address is required");
    if (!city) return alert("City is required");
    if (!state || state === "State") return alert("Please select a State");
    if (!country || country === "Country") return alert("Please select a Country");

    const addressData = {
        id: editId,
        firstName,
        lastName,
        mobileNumber: mobile,
        email,
        zipCode: zip,
        address1: address,
        address2: address2 || "",
        city,
        state,
        country,
        addressType: selectedAddressType
    };

    try {
        const response = await fetch(`http://localhost:3000/User/${userID}`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        userData.addresses = userData.addresses || []; 

        const existingIndex = userData.addresses.findIndex(addr => addr.id === editId);
        if (existingIndex !== -1) {
            userData.addresses[existingIndex] = addressData;
        } else {
            userData.addresses.push(addressData);
        }

        await fetch(`http://localhost:3000/User/${userID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        // Close the modal
        $('#editModal').modal('hide'); 
        $('.modal-backdrop').remove();

        // Dynamically update the UI
        await getAddressData(); 

    } catch (error) {
        console.error("Error while saving address: ", error);
        alert("Failed to save address.");
    }
    
}


// ---- Delete Address Popup
async function handleDeleteAddress (event) {
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:3000/User/${userID}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        
        const userData = await response.json();
        userData.addresses = userData.addresses || []; // Ensure addresses array exists
        
        // Find the address to delete
        const existingIndex = userData.addresses.findIndex(addr => addr.id == editId);
        if (existingIndex !== -1) {
            // Remove the address from the array
            userData.addresses.splice(existingIndex, 1);
        } else {
            return alert("Address not found");
        }

        // Update the user data
        await fetch(`http://localhost:3000/User/${userID}`, {
            method: 'PUT',  // We use 'PUT' because we are updating the user's data
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        alert("Address deleted successfully!");
        $('#deleteModal').modal('hide');
        $('.modal-backdrop').remove();

    } catch (error) {
        console.error("Error while deleting address: ", error);
        alert("Failed to delete address.");
    }

    getAddressData()

}


// *********** Change Password **********
function togglePasswordVisibility(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }    
}

function handlePasswordCancel () {
     document.getElementById("oldPassword").value = ""
     document.getElementById("newPassword").value = ""
     document.getElementById("confirmPassword").value = ""
}

async function handleResetPassword() {
    let oldPass = document.getElementById("oldPassword").value.trim();
    let newPass = document.getElementById("newPassword").value.trim();
    let confirmPass = document.getElementById("confirmPassword").value.trim();

    // Assume passwordObj contains user data
    if (!passwordObj || !passwordObj.password) {
        alert("User data not found. Please log in again.");
        return;
    }

    // Check if old password is correct
    if (oldPass !== passwordObj.password) {
        alert("Old password is incorrect!");
        return;
    }

    // Password strength check
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPass)) {
        alert("New password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.");
        return;
    }

    // Check if new password and confirm password match
    if (newPass !== confirmPass) {
        alert("New password and confirm password do not match!");
        return;
    }

    // Prevent setting the same password again
    if (newPass === oldPass) {
        alert("New password cannot be the same as the old password!");
        return;
    }

    // Ensure user ID is available
    let userID = passwordObj.id;
    if (!userID) {
        alert("User ID is missing. Please log in again.");
        return;
    }

    try {
        let updatedUserData = {
            id: passwordObj?.id,
            fullName: passwordObj?.fullName,
            email: passwordObj?.email,
            password: newPass,
            dateOfBirth:passwordObj?.dateOfBirth,
            gender:passwordObj?.gender,
            phoneNumber: passwordObj?.phoneNumber,
            selectedImage:passwordObj?.selectedImage,
            addresses:passwordObj?.addresses ? passwordObj?.addresses : [],
            carddetails: passwordObj?.carddetails ? passwordObj?.carddetails : [],
            confirmedOrders: passwordObj?.confirmedOrders ? passwordObj?.confirmedOrders : [],
            orders:passwordObj?.orders ? passwordObj?.orders : [],
            wishlist:passwordObj?.wishlist ? passwordObj?.wishlist : []
        };
        
        const response = await fetch(`http://localhost:3000/User/${userID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUserData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        alert("Password changed successfully!");
        console.log("Password updated for user:", userID);
        
        // Optionally, update local user data (if stored in passwordObj)
        passwordObj.password = newPass;
    } catch (error) {
        alert("Failed to update password. " + error.message);
    }
}


// Hide dropdowns when clicking outside
document.addEventListener("click", function (event) {
    if (!event.target.closest(".fa-ellipsis-vertical")) {
        document.querySelectorAll(".ds_add_dropdown").forEach(d => d.classList.add("d-none"));
    }
});


// <!-- -------------- Deactivate  Account Popup  -------------- -->

const otpField2 = document.querySelectorAll('.ds_deactivate_otp');

otpField2.forEach((field, index) => {
    field.addEventListener('input', (e) => {
        let value = e.target.value;
        
        // Ensure only a single digit is entered
        e.target.value = value.replace(/\D/g, '').slice(0, 1);

        // Move to next field if a digit is entered
        if (e.target.value && index < otpField2.length - 1) {  // Fix here
            otpField2[index + 1].focus();
        }
    });

    field.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !field.value && index > 0) {
            otpField2[index - 1].focus();  // Fix here
        }
    });
});


function handleDeactiveSendOtp() {
    
    let mobileInput = document.getElementById("ds_deactive_input")?.value.trim();
    // console.log(passwordObj?.phoneNumber == mobileInput);

    
    let mobilePattern = /^\+?[1-9]\d{9,14}$/; // Ensures at least 10 digits

    // Check if the input is valid
    if (!mobilePattern.test(mobileInput)) {
        return alert("Please enter a valid mobile number with at least 10 digits.");
    }

    // Check if the input matches the stored phone number
    if (passwordObj?.phoneNumber == mobileInput) {
        return alert("Your OTP is: 123456");
    }

    alert("Your Number Is Wrong !")

    // Proceed with sending OTP logic...
}

async function handleDeactive(event) {
    event.preventDefault();
    let otpInputs = document.querySelectorAll(".ds_deactivate_otp");
    let enteredOtp = Array.from(otpInputs).map(input => input.value).join('');

    if (enteredOtp !== "123456") {  // Simulate OTP validation (replace with actual API)
        alert("Invalid OTP. Please try again.");
        return;
    }

    // Clear OTP input fields
    document.getElementById("ds_deactive_input").value = "";
    otpInputs.forEach(input => input.value = "");

    let userID = localStorage.getItem("userId");  // Ensure userID is defined
    console.log("UserID:", userID);

    try {
        let response = await fetch(`http://localhost:3000/User/${userID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        alert("Account deactivated successfully!"); 

        $('#deactivateModal').modal('hide'); 
        $('.modal-backdrop').remove();

        localStorage.removeItem("userId");

        // Delay before redirecting to ensure modal is fully closed
            // window.open('http://127.0.0.1:5507/Akshay/home.html');
            window.location.href = "../Akshay/home.html"
            localStorage.clear()

    } catch (error) {
        alert(error);
    }
}



// ************ Log Out ***********

function handleLogOut () {
    localStorage.removeItem("userId")
    window.location.href = "/Akshay/home.html"
}


function setupAddressSelection() {
    const addressDivs = document.querySelectorAll(".V_select_add1");
    const changeButtons = document.querySelectorAll(".V_change");

    // Function to handle selection
    function selectAddress(element) {
        // Remove "selected_border" class from all addresses
        addressDivs.forEach(item => item.classList.remove("selected_border"));

        // Find the closest address div
        const addressDiv = element.closest(".V_select_add1");
        if (!addressDiv) return;

        // Add "selected_border" class to the clicked address
        addressDiv.classList.add("selected_border");

        // Store the selected address ID in localStorage
        const selectedAddressId = addressDiv.getAttribute("data-address-id");
        localStorage.setItem("selectedAddressId", selectedAddressId);
        console.log("Selected Address ID stored:", selectedAddressId);
    }

    // Attach event listener to all address divs
    addressDivs.forEach(div => {
        div.addEventListener("click", function () {
            selectAddress(this);
        });
    });

    // Attach event listener to all change buttons
    changeButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent the event from bubbling to parent
            selectAddress(this);
        });
    });
}


