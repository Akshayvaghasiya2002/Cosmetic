const userId = localStorage.getItem("userId");

let passwordObj = {};
let allBatchId = [];
let pendingId = [];
let deliverId = [];
let phoneNumber;

async function getOrderData() {
    try {
        const response = await fetch(`http://localhost:3000/User/${userId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const json = await response.json();
        console.log(json);

        passwordObj = json;
        phoneNumber = json?.phoneNumber;

        allBatchId = json?.confirmedOrders?.filter(order => order?.batchId)?.map(order => order.batchId) || [];
        console.log("All Batch IDs:", allBatchId);

        pendingId = json?.confirmedOrders?.filter(order => order?.orderStatus === "pending")?.map(order => order.batchId) || [];

        deliverId = json?.confirmedOrders?.filter(order => order?.orderStatus === "delivered")?.map(order => order.batchId) || [];
        console.log("Delivered Order Batch IDs:", deliverId);
        
    } catch (error) {
        console.error("Error fetching order data:", error);
    }
}

getOrderData();

function handleTrackOrder() {
    let orderId = document.getElementById("ds_track_input").value.trim();
    let phone = document.getElementById("ds_track_phone").value.trim();

    if (!allBatchId.includes(orderId)) {
        alert("Your Order ID does not match any existing orders.");
        return;
    }

    if (phone !== phoneNumber) {
        alert("Your Phone Number does not match.");
        return;
    }

    localStorage.setItem("MyBatchId", orderId);

    if (pendingId.includes(orderId)) {
        window.location.href = "/Dhruvin/OrderStatus(Processing).html";
    } else if (deliverId.includes(orderId)) {
        window.location.href = "/Dhruvin/OrderStatus(Delivered).html";
    }
    else{
        alert("Your Order Is Not Match")
    }
}
