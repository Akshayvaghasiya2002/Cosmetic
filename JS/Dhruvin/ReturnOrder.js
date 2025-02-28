const userId = localStorage.getItem("userId")
const batchId = localStorage.getItem("MyBatchId")
let passwordObj = {}
var mainId 
var json

async function getOrderData () {
    const respose = await fetch(`http://localhost:3000/User/${userId}`)
    json = await respose?.json()
    passwordObj = json
    console.log("json" , json);
    const finalId = json?.confirmedOrders?.filter((element)=> element?.batchId == batchId)
    mainId = finalId?.find((element)=> element?.batchId)    
    console.log(mainId?.batchId);
}

getOrderData()


async function handleRequestOtp () {
    const orderId = document.getElementById("ds_order_input").value.trim()
    const phone = document.getElementById("ds_order_phone").value.trim()
    const reason = document.querySelector("select[name='reason']")?.value;

    if (!orderId) {
        alert("Please enter your order ID.");
        return;
    }
    if (!phone) {
        alert("Please enter your phone number.");
        return;
    }
    if (!reason) {
        alert("Please select a reason for return.");
        return;
    }
    if (orderId !== mainId?.batchId) {
        alert("Invalid order ID. Please check and try again.");
        return;
    }
    if (phone !== json?.phoneNumber) {
        alert("Invalid phone number. Please check and try again.");
        return;
    }

    
    document.getElementById("ds_all_otp").classList.remove("d-none");
    document.getElementById("ds_confirm_btn").classList.remove("d-none");
    alert("Your Otp Is -: 123456")
    document.getElementById("ds_order_request").classList.add("d-none");

    
}

const otpFields = document.querySelectorAll('.ds_return_otp');

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

async function handleConfirmReturn(event) {
    // event.preventDefault();
    const orderId = document.getElementById("ds_order_input").value.trim();
    const phone = document.getElementById("ds_order_phone").value.trim();
    const reason = document.querySelector("select[name='reason']")?.value;
    const otpInputs = document.querySelectorAll(".ds_return_otp");

    if (!orderId) {
        alert("Please enter your order ID.");
        return;
    }
    if (!phone) {
        alert("Please enter your phone number.");
        return;
    }
    if (!reason) {
        alert("Please select a reason for return.");
        return;
    }
    if (orderId !== mainId?.batchId) {
        alert("Invalid order ID. Please check and try again.");
        return;
    }
    if (phone !== json?.phoneNumber) {
        alert("Invalid phone number. Please check and try again.");
        return;
    }

    let enteredOtp = "";
    let finalOtp = "123456"
    otpInputs.forEach(input => {
        enteredOtp += input.value.trim();
    });

    if (enteredOtp.length !== 6 || isNaN(enteredOtp)) {
        alert("Please enter a valid 6-digit OTP.");
        return;
    }

    // Assuming expectedOtp is stored somewhere (Fix the incorrect condition)
    if (enteredOtp !== finalOtp) {
        alert("Incorrect OTP. Please try again.");
        return;
    }

    document.getElementById("ds_all_otp").classList.add("d-none");
    document.getElementById("ds_confirm_btn").classList.add("d-none");
    document.getElementById("ds_order_request").classList.remove("d-none");

    try {
        // Ensure batchId is properly defined
        const batchId = mainId?.batchId;

        // Check if the order exists in confirmedOrders
        const orderIndex = json?.confirmedOrders?.findIndex(order => order.batchId === batchId);

        if (orderIndex === -1) {
            alert("Order not found.");
            return;
        }

        // Add returnOrder key to the matched order
        json.confirmedOrders[orderIndex].orderStatus = "return order";
        json.confirmedOrders[orderIndex].returnOrder = {
            reason: reason,
            returnDate: new Date().toISOString()?.split("T")[0],
        };

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
            confirmedOrders:json?.confirmedOrders,
            orders:passwordObj?.orders ? passwordObj?.orders : [],
            wishlist:passwordObj?.wishlist ? passwordObj?.wishlist : []
        }

        // Send the updated data to the server using fetch
        const response = await fetch(`http://localhost:3000/User/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert("Return request submitted successfully.");
            
        } else {
            alert("Failed to submit return request. Try again.");
        }
    } catch (error) {
        console.error("Error updating order:", error);
        alert("An error occurred while processing your request.");
    }

}
