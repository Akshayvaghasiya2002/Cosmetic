        // Run only after the DOM is fully loaded
        document.addEventListener("DOMContentLoaded", function () {
            const form = document.getElementById("signupForm");

            if (form) {
                form.addEventListener("submit", handleFormSubmission);
            } else {
                console.error("Form element not found!");
            }
        });

        // Handle form submission
        function handleFormSubmission(event) {
            event.preventDefault();  // Prevent default form submission

            console.log("Form submission triggered");

            // Run validation
            if (validateForm()) {
                console.log("Validation passed");
                // Store user data and proceed with the verification
                storeUserData();
            } else {
                console.log("Validation failed");
            }
        }

        // Function to validate the form
        function validateForm() {
            const fullNameInput = document.getElementById("fullName");
            const phoneNumberInput = document.getElementById("phoneNumber");
            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("pwd");

            const fullName = fullNameInput.value.trim();
            const phoneNumber = phoneNumberInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            const fullNameField = fullNameInput.getAttribute("placeholder") || "Full Name";
            const phoneNumberField = phoneNumberInput.getAttribute("placeholder") || "Phone Number";
            const emailField = emailInput.getAttribute("placeholder") || "Email";
            const passwordField = passwordInput.getAttribute("placeholder") || "Password";

            let emptyFields = [];

            // Name validation (letters and spaces only)
            const nameRegex = /^[a-zA-Z\s]+$/;
            if (!fullName) {
                emptyFields.push(fullNameField);
            } else if (!nameRegex.test(fullName)) {
                alert("Full name must only contain letters and spaces.");
                return false;
            }

            // Phone number validation (10 digits)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneNumber) {
                emptyFields.push(phoneNumberField);
            } else if (!phoneRegex.test(phoneNumber)) {
                alert("Please enter a valid 10-digit phone number.");
                return false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                emptyFields.push(emailField);
            } else if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return false;
            }

            // Password validation (at least 8 characters, with letters, numbers, and special characters)
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
            if (!password) {
                emptyFields.push(passwordField);
            } else if (!passwordRegex.test(password)) {
                alert("Password must be at least 8 characters long and include at least one letter, one number, and one special character.");
                return false;
            }

            // If any fields are empty, show an alert
            if (emptyFields.length > 0) {
                alert("The following fields are empty: " + emptyFields.join(", "));
                return false;
            }

            return true;
        }

        // Function to store user data on the JSON Server
        function storeUserData(event) {
            // event.preventDefault(); // Prevent form submission from reloading the page
        
            const fullName = document.getElementById("fullName").value.trim();
            const phoneNumber = document.getElementById("phoneNumber").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("pwd").value.trim();
        
            if (!fullName || !phoneNumber || !email || !password) {
                alert("Please fill in all fields!");
                return;
            }
        
            // Check if the user already exists before creating a new one
            fetch(`http://localhost:3000/User`)
                .then(response => response.json())
                .then(users => {
                    // Convert both stored and input emails to lowercase for comparison
                    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
            
                    if (existingUser) {
                        alert("This email is already registered. Please log in instead.");
                        return;
                    }
            
                    // If user does not exist, create new user
                    const newUser = { fullName, phoneNumber, email, password, wishlist: [] };
            
                    return fetch('http://localhost:3000/User', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newUser)
                    });
                })
                .then(response => response ? response.json() : null)
                .then(data => {
                    if (data) {
                        console.log("New user created:", data);
                        localStorage.setItem("userId", data.id);
                        verifyEmail();
                    }
                })
                .catch(error => console.error("Error:", error));
        }
        


        // Function to verify email and display the modal
        function verifyEmail() {
            // Proceed only if validation passes
            const hideResister = document.querySelector('.V_sign_section');
            hideResister.classList.add('d-none');

            const hideWholeResister = document.querySelector('.V_sign_login');
            hideWholeResister.classList.add('d-none');
            
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

            // Log success to console for debugging
            console.log("UI updated successfully");

            // Open the "Forget Password" modal using Bootstrap's modal API
            const modalElement = document.getElementById('forgetPwdModal');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();  // This triggers the modal to show
        }











        // Handle the Login button click event
document.getElementById("loginBtn").addEventListener("click", handleLogin);

function handleLogin() {
    const emailInput = document.getElementById("exampleInputEmail1");
    const passwordInput = document.getElementById("pwd3");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    // Send GET request to JSON Server to fetch users
    fetch('http://localhost:3000/User')
        .then(response => response.json())
        .then(users => {
            // Search for the user that matches the email and password
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                // If user is found, store the user ID in localStorage
                localStorage.setItem("userId", user.id);
                alert("Login successful!");
                window.location.reload();
                // You can now redirect to another page or update the UI accordingly
            } else {
                // If no match found
                alert("Invalid email or password.");
            }
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            alert("There was an error processing your login. Please try again.");
        });
}




function renderWishlist() {
    window.location.href = "/Parth/Wishlist.html";
}



let newData = JSON.parse(localStorage.getItem("Register"))
newData ? newData : ""