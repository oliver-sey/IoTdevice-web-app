// Define an object 'requestBody' to store user credentials for the sign-in process
let requestBody = {
    email: "",
    password: ""
}

$(document).ready(() => {
    // Log the current hostname to the console for debugging purposes
    console.log("hostname", window.location.hostname);

    // Call function to add click handlers once the document is fully loaded
    // This ensures that the handlers are properly attached to elements
    console.log("Document is ready, calling addClickHandlers()")
    addClickHandlers();
});

// Function to add click event handlers to elements
function addClickHandlers() {
    console.log("in the addClickHandlers function");

    // Add click event handler to the 'Sign in' button
    // Prevents the default form submission and instead calls logIn()
    $("#signin").click((event) => {
        event.preventDefault();
        logIn();
    });
}

// Function to set the requestBody object with user input from the sign-in form
function setRequestBody() {
    requestBody.email = $("#floatingInput").val(); // Get email from input field
    requestBody.password = $("#floatingPassword").val(); // Get password from input field
    console.log("requestBody", requestBody); // Log requestBody for debugging
}

// Function to handle the login process
function logIn() {
    console.log("In the logIn() function");
    setRequestBody(); // Set the requestBody with user inputs

    // AJAX POST request for user login
    $.ajax({
        url: "/users/user",
        method: "POST",
        data: JSON.stringify(requestBody),
        contentType: "application/json",
        dataType: "json"
    })
    .done(function(data) {
        // On successful login, store user data in local storage
        console.log("response data", data);
        localStorage.setItem("userName", data.result.userName);
        localStorage.setItem("email", data.result.email);
        localStorage.setItem("password", data.result.password);
        localStorage.setItem("jwt", data.jwt);

        // Redirect to the logged-in user's homepage
        window.location.assign("LoggedInPage.html");
        alert("Login Success");
    })
    .fail(function(err) {
        // Alert the user if login fails
        alert("Login Fail");
    });
}
