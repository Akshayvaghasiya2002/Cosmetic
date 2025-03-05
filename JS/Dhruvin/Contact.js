document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.ds_contact_box');
    const submitBtn = document.getElementById("submitBtn");

    // Comprehensive form validation
    function validateForm(formData) {
        const errors = {};

        // Name validation
        if (!formData.name || formData.name.trim().length < 2) {
            errors.name = "Please enter a valid name (at least 2 characters)";
        }

        // Email validation with more robust regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email || !emailRegex.test(formData.email.trim())) {
            errors.email = "Please enter a valid email address";
        }

        // Subject validation
        if (!formData.subject || formData.subject.trim().length < 3) {
            errors.subject = "Please enter a valid subject (at least 3 characters)";
        }

        // Message validation
        if (!formData.message || formData.message.trim().length < 10) {
            errors.message = "Please enter a message (at least 10 characters)";
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    // Display validation errors
    function displayErrors(errors) {
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        Object.entries(errors).forEach(([field, message]) => {
            const inputElement = document.getElementById(field);
            if (inputElement) {
                const errorSpan = document.createElement('span');
                errorSpan.className = 'error-message text-danger small mt-1';
                errorSpan.textContent = message;
                inputElement.classList.add('is-invalid');
                inputElement.parentNode.appendChild(errorSpan);
            }
        });
    }

    // Clear form errors
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    }

    // Submit event handler
    submitBtn.addEventListener("click", async function (event) {
        event.preventDefault();
        clearErrors();

        // Collect form data
        const formData = {
            id: Date.now(), // Unique identifier
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim(),
            timestamp: new Date().toISOString()
        };

        // Validate form
        const validationResult = validateForm(formData);

        if (!validationResult.isValid) {
            displayErrors(validationResult.errors);
            return;
        }

        // Disable submit button during submission
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        try {
            // First, check if contactUs exists
            const checkResponse = await fetch("http://localhost:3000/contactUs");
            
            let contactUsData;
            if (!checkResponse.ok) {
                // If contactUs doesn't exist, create it
                const initResponse = await fetch("http://localhost:3000/contactUs", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify([])
                });

                if (!initResponse.ok) {
                    throw new Error(`Failed to initialize contactUs: ${initResponse.statusText}`);
                }
            }

            // Now send the contact form data
            const postResponse = await fetch("http://localhost:3000/contactUs", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!postResponse.ok) {
                throw new Error(`Server responded with ${postResponse.status}: ${postResponse.statusText}`);
            }

            const result = await postResponse.json();

            // Success handling
            Swal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: 'We\'ll get back to you soon.',
                confirmButtonColor: '#3085d6'
            });

            // Reset form
            form.reset();
        } catch (error) {
            console.error("Submission Error:", error);
            
            // Error handling with SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again later.',
                confirmButtonColor: '#d33'
            });
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit';
        }
    });

    // Optional: Real-time validation as user types
    ['name', 'email', 'subject', 'message'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener('input', function() {
            this.classList.remove('is-invalid');
            const errorMessage = this.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
});