const userId = localStorage.getItem("userId")
const batchId = localStorage.getItem("MyBatchId")
let passwordObj = {}

async function getOrderData () {
    const respose = await fetch(`http://localhost:3000/User/${userId}`)
    const json = await respose.json()
    console.log(json);
    
    passwordObj = json

    const filter = json?.confirmedOrders?.find((element)=> element?.batchId == batchId)
    console.log('filter' , filter);
}

getOrderData()


async function handleCancelOrder() {
    let select = document.querySelector("select[name='reason']")?.value;
    let comments = document.querySelector("#ds_textarea").value.trim();

    if (!select) {
        alert("Please select a reason for cancellation.");
        return;
    }

    if (comments === "") {
        alert("Please provide additional comments for your reason.");
        return;
    }

    let myDate =  new Date().toISOString()?.split("T")[0]
    // Find the specific order using batchId
    let updatedOrders = passwordObj?.confirmedOrders?.map(order => {
        if (order.batchId === batchId) {
            return {
                ...order,
                orderStatus:"cancelled",
                cancel: {
                    reason: select,
                    comment: comments,
                    cancelDate:myDate
                }
            };
        }
        return order;
    });



    const userData = {
        id:passwordObj?.id,
        fullName:passwordObj?.fullName,
        email:passwordObj?.email,
        password:passwordObj?.password,
        dateOfBirth:passwordObj?.dateOfBirth,
        gender:passwordObj?.gender,
        phoneNumber:passwordObj?.phoneNumber,
        selectedImage:passwordObj?.selectedImage,
        addresses: passwordObj?.addresses,
        carddetails: passwordObj?.carddetails,
        confirmedOrders: updatedOrders,
        orders:passwordObj?.orders,
        wishlist:passwordObj?.wishlist
    };

    try {
        const response = await fetch(`http://localhost:3000/User/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (response) {
            alert("Order cancellation request submitted successfully!");
            localStorage.setItem("cancelSuccess", "true");
        } else {
            alert("Failed to update order. Please try again.");
        }
    } catch (error) {
        console.error("Error updating order:", error);
        alert("An error occurred. Please try again later.");
    }
}

function hello() {
    let modal = new bootstrap.Modal(document.getElementById('cancelOrder'));
    modal.show();
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("cancelSuccess") === "true") {
        localStorage.removeItem("cancelSuccess"); 
        hello(); 
    }
});


