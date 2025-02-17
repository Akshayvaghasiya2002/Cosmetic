// Initialize the count variable
let count = 1;

// Function to increase the count
function increaseCount() {
    count++;
    updateCountDisplay();
}

// Function to decrease the count
function decreaseCount() {
    if (count > 1) {
        count--;
        updateCountDisplay();
    }
}

// Function to update the count in the DOM
function updateCountDisplay() {
    const countElement = document.getElementById("itemCount");
    countElement.innerText = count;
}

// Function to delete the item
function deleteItem() {
    const itemElement = document.querySelector(".d-flex");
    itemElement.remove(); // Remove the whole item from the DOM
}



