$(document).ready(()=>{
	if (!localStorage.getItem('jwt')) {//check if user logged in yet
        alert('Please log in first...')
        window.location.assign("signin.html")
    }
	
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
    console.log("in the addClickHandlers function in updateAccount")
    
    // when you click 'Sign up' button on the login screen, call logIn()
    $("#update").click((event) => {
        //event.preventDefault(); // Prevent form submission
		let formErrors = document.getElementById("formErrors");
		formErrors.innerHTML = "";
		formErrors.style.display = "none";

		let password = document.getElementById("newPassword");
		let confirmPassword = document.getElementById("confirmNewPassword");
		let errors = [];


		// perform checks. CURRENTLY DOES NOT CHECK FOR FULL ENGLISH WORDS, MAY HAVE TO ADD THAT LATER DEPENDING
		// *** users can't edit their email

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
            updateAccount()
		}
    })
}

function updateAccount() {//get the new user input to update account info 
	// trim whitespace off the front and end
	let user_Name = $("#userName").val();
	// **by this point we have checked that the password and the confirm password are the same
	let pass_word = $("#newPassword").val();

	$.ajax({//ajax call to update user account
		url: "/users/update", 
        method: "PATCH",
        data: JSON.stringify({email: localStorage.getItem('email'), userName: user_Name, password: pass_word}),
        contentType: "application/json",
        dataType: "json"
	})
	.done((data) => {
		console.log("update success", data)
		localStorage.clear()
		alert("account update success, please login again")
		window.location.assign("signin.html")
	})
	.fail((err) => {
		console.log("update fail", err)
		alert("account update fail")
	})
}