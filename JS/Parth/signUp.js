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
                        localStorage.setItem("demoId", data.id);
                        localStorage.setItem("registerId", data?.id);
                        localStorage.setItem("registerSuccess" , "true" );
                        localStorage.setItem("email" , email );
                        // verifyEmail();
                    }
                })
                .catch(error => console.error("Error:", error));
        }
        


        // // Function to verify email and display the modal
        // function verifyEmail() {
        //     // Proceed only if validation passes
        //     const hideResister = document.querySelector('.V_sign_section');
        //     hideResister.classList.add('d-none');

        //     const hideWholeResister = document.querySelector('.V_sign_login');
        //     hideWholeResister.classList.add('d-none');
            
        //     const displaySignUp = document.querySelector(".V_520");
        //     displaySignUp.classList.remove('d-none');
            
        //     const displayEmail = document.querySelector(".V_verify_email_section");
        //     displayEmail.classList.remove("d-none");
            
        //     const displayOtp = document.querySelector(".V_verify_section");
        //     displayOtp.classList.add('d-none');
            
        //     const displayResetPwd = document.querySelector(".V_reset_section");
        //     displayResetPwd.classList.add('d-none');
            
        //     const hideforPwd = document.querySelector(".V_Forgot_section");
        //     hideforPwd.classList.add("d-none");

        //     // Log success to console for debugging
        //     console.log("UI updated successfully");

        //     // Open the "Forget Password" modal using Bootstrap's modal API
        //     const modalElement = document.getElementById('forgetPwdModal');
        //     const modal = new bootstrap.Modal(modalElement);
        //     modal.show();  // This triggers the modal to show
        //     alert("your otp is: 123456");

        // }




        // document.addEventListener("DOMContentLoaded", () => {
        //     if (localStorage.getItem("registerSuccess") === "true") {
        //         localStorage.removeItem("registerSuccess"); 
        //         verifyEmail(); 
        //     }
        // });






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




let newData = localStorage.getItem("Register");
if (newData) {
    newData = JSON.parse(newData);
}




// Initialize variables to store OTP and user email
let userOtp = "123456"; // Static OTP

// Function to display the verification email screen with the user's email
function verifyEmail() {
    // Try to get the email from multiple sources
    let userEmail = "";
    
    // First, try to get from input if we're coming directly from registration
    const emailInput = document.getElementById("email");
    if (emailInput && emailInput.value) {
        userEmail = emailInput.value.trim();
        localStorage.setItem("userEmail", userEmail); // Store for later use
    } 
    // If not available, try to get from localStorage
    else if (localStorage.getItem("email")) {
        userEmail = localStorage.getItem("email");
    } 
    // If still not available, try to get from userId in localStorage
    else if (localStorage.getItem("userId")) {
        // Fetch user data from server using userId
        fetchUserEmailFromServer(localStorage.getItem("userId"))
            .then(email => {
                if (email) {
                    userEmail = email;
                    updateEmailDisplay(email);
                }
            })
            .catch(error => {
                console.error("Error fetching user email:", error);
            });
    }
    
    // Update the email display immediately if we have it
    if (userEmail) {
        updateEmailDisplay(userEmail);
    }

    // Show verification UI
    showVerificationUI();
    
    // Alert the static OTP
    alert("Your OTP is: " + userOtp);
    
    // Setup OTP input fields
    setupOtpInputs();
}

// Function to fetch user email from server using userId
async function fetchUserEmailFromServer(userId) {
    try {
        const response = await fetch(`http://localhost:3000/User/${userId}`);
        const userData = await response.json();
        
        if (userData && userData.email) {
            // Store email in localStorage for future use
            localStorage.setItem("userEmail", userData.email);
            return userData.email;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

// Function to update the email display
function updateEmailDisplay(email) {
    const emailSpan = document.getElementById("verifyEmail");
    if (emailSpan) {
        emailSpan.textContent = email;
    }
}

// Function to show verification UI
function showVerificationUI() {
    // Hide registration section
    const hideResister = document.querySelector('.V_sign_section');
    if (hideResister) hideResister.classList.add('d-none');

    const hideWholeResister = document.querySelector('.V_sign_login');
    if (hideWholeResister) hideWholeResister.classList.add('d-none');
    
    // Show verification container
    const displaySignUp = document.querySelector(".V_520");
    if (displaySignUp) displaySignUp.classList.remove('d-none');
    
    // Show email verification section
    const displayEmail = document.querySelector(".V_verify_email_section");
    if (displayEmail) displayEmail.classList.remove("d-none");
    
    // Hide other sections
    const displayOtp = document.querySelector(".V_verify_section");
    if (displayOtp) displayOtp.classList.add('d-none');
    
    const displayResetPwd = document.querySelector(".V_reset_section");
    if (displayResetPwd) displayResetPwd.classList.add('d-none');
    
    const hideforPwd = document.querySelector(".V_Forgot_section");
    if (hideforPwd) hideforPwd.classList.add("d-none");

    // Open modal
    const modalElement = document.getElementById('forgetPwdModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// Function to set up OTP input field behavior
function setupOtpInputs() {
    const otpInputs = document.querySelectorAll('.V_otp_6');
    
    // Clear any previous values
    otpInputs.forEach(input => {
        input.value = '';
    });
    
    // Add event listeners for input fields
    otpInputs.forEach((input, index) => {
        // Remove any existing event listeners
        input.removeEventListener('input', handleInput);
        input.removeEventListener('keydown', handleKeyDown);
        
        // Add new event listeners
        input.addEventListener('input', handleInput);
        input.addEventListener('keydown', handleKeyDown);
        
        // Set maxlength to 1
        input.maxLength = 1;
    });
    
    // Focus on the first input
    if (otpInputs.length > 0) {
        otpInputs[0].focus();
    }
}

// Handle input in OTP fields
function handleInput(e) {
    const inputs = document.querySelectorAll('.V_otp_6');
    const index = Array.from(inputs).indexOf(e.target);
    
    // If user entered a value and there's a next input, focus on it
    if (e.target.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
    }
}

// Handle keydown in OTP fields
function handleKeyDown(e) {
    const inputs = document.querySelectorAll('.V_otp_6');
    const index = Array.from(inputs).indexOf(e.target);
    
    // Handle backspace
    if (e.key === 'Backspace') {
        // If the current field is empty and there's a previous field, focus on it
        if (!e.target.value && index > 0) {
            inputs[index - 1].focus();
        }
    }
}

// Function to verify the entered OTP
function verifyOtp() {
    const inputs = document.querySelectorAll('.V_otp_6');
    const enteredOtp = Array.from(inputs).map(input => input.value).join('');
    
    // Error message container
    let errorContainer = document.querySelector('.otp-error-message');
    
    // Create error message element if it doesn't exist
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'otp-error-message text-danger text-center mt-2';
        const verifyButton = document.querySelector('.V_verify_email_section .V_register');
        if (verifyButton) {
            verifyButton.parentNode.insertBefore(errorContainer, verifyButton);
        }
    }
    
    // Check if OTP is correct
    if (enteredOtp === userOtp) {
        // Clear any error message
        errorContainer.textContent = '';
        
        // Close the modal
        const modalElement = document.getElementById('forgetPwdModal');
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            }
        }
        
        // Optional: Show success message
        alert("Email verified successfully!");

       const userId = localStorage.getItem("demoId")
        
        // Remove registerSuccess flag as verification is complete
        localStorage.removeItem("registerSuccess");
        localStorage.removeItem("email");
        localStorage.removeItem("demoId");
        localStorage.setItem("userId", userId);
    } else {
        alert("incorrect otp");
    }
}

// Function to resend OTP
function resendOtp() {
    // Generate new OTP (in this case, we're keeping the static OTP)
    // userOtp = "123456"; // Uncomment if you want to generate a new OTP
    
    // Alert the user with the OTP
    alert("Your OTP is: " + userOtp);
    
    // Clear input fields and set focus to first input
    const inputs = document.querySelectorAll('.V_otp_6');
    inputs.forEach(input => {
        input.value = '';
    });
    
    if (inputs.length > 0) {
        inputs[0].focus();
    }
    
    // Clear any error messages
    const errorContainer = document.querySelector('.otp-error-message');
    if (errorContainer) {
        errorContainer.textContent = '';
    }
}

// Set up event listeners when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Setup for Verify OTP button
    const verifyButton = document.querySelector('.V_verify_email_section .V_register');
    if (verifyButton) {
        verifyButton.addEventListener('click', verifyOtp);
    }
    
    // Setup for Resend link
    const resendLink = document.querySelector('.V_verify_email_section .V_r_login');
    if (resendLink) {
        resendLink.addEventListener('click', resendOtp);
        // Add pointer cursor to make it obvious it's clickable
        resendLink.style.cursor = 'pointer';
    }
    
    // Check if we need to show verification screen after registration
    if (localStorage.getItem("registerSuccess") === "true") {
        verifyEmail();
    }
    
    // Modify the storeUserData function to call verifyEmail after successful registration
    const originalStoreUserData = window.storeUserData;
    if (typeof originalStoreUserData === 'function') {
        window.storeUserData = function() {
            // Call the original function
            originalStoreUserData.apply(this, arguments);
            
            // Then call verifyEmail
            setTimeout(() => {
                if (localStorage.getItem("registerSuccess") === "true") {
                    verifyEmail();
                }
            }, 500);
        };
    }
});
