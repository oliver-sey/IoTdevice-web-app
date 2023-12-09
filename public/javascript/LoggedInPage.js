// Initialize an object to store request body data
let requestBody = {
    email: "",
    password: ""
}

$(document).ready(() => {
    // Check if the user is logged in by looking for a JWT token in local storage
    if (!localStorage.getItem('jwt')) {
        alert('Please log in first...') // Alert the user if not logged in
        window.location.assign("signin.html") // Redirect to the sign-in page
    }

    // Log the current hostname for debugging purposes
    console.log("hostname", window.location.hostname);

    // AJAX call to retrieve all user devices
    $.ajax({
        url: `/device/mydevices?email=${localStorage.getItem('email')}`, // API endpoint with user's email
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {"x-access-token" : localStorage.getItem('jwt')} // Include JWT in request headers
    })
    .done(function(res) {
        console.log("my devices", res, res.length); // Log retrieved devices for debugging

        // Loop through the devices and display them in a table
        for (let i = 0; i < res.length; i++) {
            $(`#r${i}`).after(`<tr id="r${i + 1}"> <td>${i + 1}</td> <td>${res[i].deviceName}</td> <td>${res[i].register_Date}</td>  <td><button class="btn btn-med btn-primary" id="btn${i + 1}">delete</button></td></tr>`)

            // Event listener for delete button
            $(`#btn${i + 1}`).click(() => {
                // AJAX call to delete a device
                $.ajax({
                    url: "/device/delete",
                    method: "DELETE",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({deviceName: res[i].deviceName}),
                    headers: {"x-access-token" : localStorage.getItem('jwt')}
                })
                .done((data) => {
                    console.log("delete success", data); // Log success message
                    alert("Delete this device?");
                    location.reload(); // Reload the page after deletion
                })
                .fail((err) => {
                    console.log("delete fail", err); // Log failure message
                    alert("Delete fail");
                })
            })
        }
    })
    .fail(function(err) {
        $('#deviceStart').text("You have no device yet!"); // Display message if no devices are found
        console.log("my devices err", err); // Log error message
    });

    // Additional logging to indicate that document is ready and function is being called
    console.log("Document is ready, calling addClickHandlers()");
    addClickHandlers(); // Call the function to add click handlers
})

// Function to add click handlers and set user details
function addClickHandlers() {
    console.log("in the addClickHandlers function");
    $('#userName').text(localStorage.getItem('userName')); // Set user name in the UI

    // Additional functionality commented out for setting request body and making an AJAX call

    // Event handler for creating a new device
    $('#newDevice').click(function(param) {
        window.location.assign("registerDevice.html"); // Redirect to device registration page
    });

    // Event handler for logging out
    $('#logOut').click(logOut); // Call logOut function when the button is clicked
}

// Function to set the request body with user details
function setRequestBody() {
    requestBody.email = localStorage.getItem('email');
    requestBody.password = localStorage.getItem('password');
    console.log("LoggedIn requestBody", requestBody); // Log request body for debugging
}

// Function to handle user logout
function logOut() {
    localStorage.clear(); // Clear local storage data
    window.location.assign("signin.html"); // Redirect to sign-in page
    alert("You have successfully logged out!"); // Alert the user upon successful logout
}
