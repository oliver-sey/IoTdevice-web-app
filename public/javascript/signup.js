// Initialize a request body object for AJAX call during user sign up
let requestBody = {
	userName: "",
    email: "",
    password: ""
}

// Execute when the document is fully loaded
$(document).ready(()=>{
    // Log the hostname for debugging purposes
    console.log("hostname", window.location.hostname);

    // Call the function to add all click event handlers
    console.log("Document is ready, calling addClickHandlers()");
    addClickHandlers();
});

// Function that contains all click event handlers
function addClickHandlers() {
    // Log for debugging to confirm function execution
    console.log("in the addClickHandlers function");
    
    // Click event handler for 'Sign up' button
    $("#submit").click((event) => {
        // Prevent default form submission
        event.preventDefault();

        // Initialize form error display elements
		let formErrors = document.getElementById("formErrors");
		formErrors.innerHTML = "";
		formErrors.style.display = "none";

        // Retrieve user inputs from the form
		let email = document.getElementById("email");
		let password = document.getElementById("password");
		let confirmPassword = document.getElementById("passwordConfirm");
		let errors = [];

        // Email format validation
		if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/.test(email.value)) {
			errors.push("Invalid or missing email address.");
			email.classList.add("error");
		}

        // Password length validation
		if (10 > password.value.length || password.value.length > 20) {
			errors.push("Password must be between 10 and 20 characters.");
			password.classList.add("error");
		}

        // Lowercase character validation in password
		if (!/[a-z]/.test(password.value)) {
			errors.push("Password must contain at least one lowercase character.");
			password.classList.add("error");
		}

        // Uppercase character validation in password
		if (!/[A-Z]/.test(password.value)) {
			errors.push("Password must contain at least one uppercase character.");
			password.classList.add("error");
		}

        // Digit validation in password
		if (!/[0-9]/.test(password.value)) {
			errors.push("Password must contain at least one digit.");
			password.classList.add("error");
		}

        // Password and confirm password match validation
		if (password.value != confirmPassword.value) {
			errors.push("Password and confirmation password don't match.");
			confirmPassword.classList.add("error");
		}

        // Display errors or proceed to sign up
		if (errors.length > 0) {
			formErrors.innerHTML =
				'<ul class = "form-errors text-danger list-unstyled"><li>' +
				errors.join("</li><li>") +
				"</li></ul>";
			formErrors.style.display = "block";
		} else {
            signUp();
		}
    })
}

// Function to populate the request body with user inputs
function setRequestBody() {
    requestBody.email = $("#email").val();
    requestBody.password = $("#password").val();
	requestBody.userName = $('#userName').val();
    console.log("requestBody", requestBody);
}

// Function to handle the sign-up process
function signUp() {
    console.log("In the signUp() function");
    setRequestBody();

    // AJAX call for creating a new user account
    $.ajax({
        url: "/users/create", 
        method: "POST",
        data: JSON.stringify(requestBody),
        contentType: "application/json",
        dataType: "json"
     })
     .always(function(data) {
        console.log("result", data);
        window.location.assign("signin.html");
        alert("Sign up Success! Now please Sign in");
     })
     .done(function(data) {
        console.log("signUp success", data);
     });
}
