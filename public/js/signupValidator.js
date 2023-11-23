// verifies that the user has enetered valid information into fields.

document
	.getElementById("form-signup")
	.addEventListener("change", function (event) {
		event.preventDefault(); // Prevent form submission

		let formErrors = document.getElementById("formErrors");
		formErrors.innerHTML = "";
		formErrors.style.display = "none";

		let email = document.getElementById("email");
		let password = document.getElementById("password");
		let confirmPassword = document.getElementById("passwordConfirm");
		let errors = [];

		console.log("Email: " + email.value);
        // TODO: get rid of this!!!!
		console.log("Password: " + password.value);

		// perform checks. CURRENTLY DOES NOT CHECK FOR FULL ENGLISH WORDS, MAY HAVE TO ADD THAT LATER DEPENDING
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
				'<ul class = "text-danger list-unstyled"><li>' +
				errors.join("</li><li>") +
				"</li></ul>";
			formErrors.style.display = "block";
		} 
		// else {
        //     // TODO: is this right? was "this.submit" before but that didn't work
		// 	event.target.submit();
		// }
	});
