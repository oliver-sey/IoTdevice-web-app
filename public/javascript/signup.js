let requestBody = {//request body for ajax call
	userName: "",
    email: "",
    password: ""
}

$(document).ready(()=>{
    console.log("hostname", window.location.hostname)
    // call the function that will add all the click handlers
    // we put this in a function because it didn't seem to add the handlers
    // if we did it outside a function
    console.log("Document is ready, calling addClickHandlers()")
    addClickHandlers()
})

// **** put all your adding click handlers in here!!!
// this gets called when the document is ready
function addClickHandlers() {
    console.log("in the addClickHandlers function")
    
    // when you click 'Sign up' button on the login screen, call logIn()
    $("#submit").click((event) => {//if user click submit for sign up
        event.preventDefault(); // Prevent form submission

		let formErrors = document.getElementById("formErrors");
		formErrors.innerHTML = "";
		formErrors.style.display = "none";

		let username = document.getElementById("userName");
		let email = document.getElementById("email");
		let password = document.getElementById("password");
		let confirmPassword = document.getElementById("passwordConfirm");
		let errors = [];

		console.log("Email: " + email.value);
		console.log("Password: " + password.value);


		// remove "error" from all the HTML elements, if there is an error 
		// it will get added back
		username.classList.remove("error");
		email.classList.remove("error");
		password.classList.remove("error");
		confirmPassword.classList.remove("error");


		if (username.value.trim() == "") {
			errors.push("Missing username.");
			username.classList.add("error");
		}
		if (
			!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/.test(email.value)
		) {
			errors.push("Invalid or missing email address.");
			email.classList.add("error");
		}

		if (10 > password.value.length || password.value.length > 20) {
			errors.push("Password must be between 10 and 20 characters.");
			password.classList.add("error");
		}

		if (!/[a-z]/.test(password.value)) {
			errors.push(
				"Password must contain at least one lowercase character."
			);
			password.classList.add("error");
		}

		if (!/[A-Z]/.test(password.value)) {
			errors.push(
				"Password must contain at least one uppercase character."
			);
			password.classList.add("error");
		}

		if (!/[0-9]/.test(password.value)) {
			errors.push("Password must contain at least one digit.");
			password.classList.add("error");
		}

		if (password.value != confirmPassword.value) {
			errors.push("Password and confirmation password don't match.");
			confirmPassword.classList.add("error");
		}

		if (errors.length > 0) {
			formErrors.innerHTML =
				'<ul class = "form-errors text-danger list-unstyled"><li>' +
				errors.join("</li><li>") +
				"</li></ul>";
			formErrors.style.display = "block";
		} 
		else {
            signUp()
		}
    })
}

function setRequestBody() {// get user input as request body
    requestBody.email = $("#email").val()
    requestBody.password = $("#password").val()
	requestBody.userName = $('#userName').val()
    console.log("requestBody", requestBody)
}

function signUp() {
    console.log("In the signUp() function")
    setRequestBody()
    $.ajax({// ajax call to create a user account
        url: "/users/create", 
        method: "POST",
        data: JSON.stringify(requestBody),
        contentType: "application/json",
        dataType: "json"
     })
     .always(function(data) {// if success, redirect to sign in page
        console.log("result", data)
        window.location.assign("signin.html")
        alert("Sign up Success! Now please Sign in")
     })
     .done(function(data) {
        console.log("signUp success", data);
     });
}